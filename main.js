const {
    app,
    BrowserWindow,
    screen,
    ipcMain
} = require('electron');

const redis = require("redis");
const homedir = require('os').homedir();
const Configuration = require('./app/core/configuration')

let mainWindow = null

app.on('ready', () => {

    let config = new Configuration(`${homedir}/.elexsrvs`);
    config.load().then(() => {
        const primaryDisplay = screen.getPrimaryDisplay()
        const {
            width,
            height
        } = primaryDisplay.workAreaSize;

        mainWindow = new BrowserWindow({
            width,
            height,
            webPreferences: {
                preload: `${__dirname}/preload.js`
            }
        });

        mainWindow.loadURL(`file://${__dirname}/app/views/index.html`);
        mainWindow.webContents.on('did-finish-load', () => {
            let healthCheckPromises = config.servers.map(async server => {
                const healthy = await checkServerHealthy(server);
                server['available'] = healthy;
                return server;
            });

            Promise.all(healthCheckPromises).then(servers => mainWindow.webContents.send('render-server-list', servers))

        })
    });
});

app.on('window-all-closed', () => {
    app.quit();
})

let aboutWindow = null;
ipcMain.on('open-about-window', () => {
    if (!aboutWindow) {
        aboutWindow = new BrowserWindow({
            width: 500,
            height: 400,
            parent: mainWindow,
            modal: true,
            frame: false,
            webPreferences: {
                preload: `${__dirname}/preload.js`
            }
        });

        aboutWindow.on('closed', () => aboutWindow = null);
    }

    aboutWindow.loadURL(`file://${__dirname}/app/views/about.html`);
});

ipcMain.on('close-about-window', () => aboutWindow.close());

async function checkServerHealthy(server) {
    let client = null;
    return new Promise((resolve, reject) => {

        client = redis.createClient({
            host: server.host,
            port: server.port
        });

        client.on('connect', () => {
            resolve(true);
        });

        client.on('error', () => {
            resolve(false);
        });

    }).finally(() => {
        try {
            client && client.quit();
        } catch (err) {
            console.error(err);
        }
    });


}