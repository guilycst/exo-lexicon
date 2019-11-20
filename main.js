const {
    app,
    BrowserWindow,
    screen,
    ipcMain
} = require('electron');

let mainWindow = null

app.on('ready', () => {
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
