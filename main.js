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

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
    app.quit();
})

let aboutWindow = null;
ipcMain.on('open-about-window', () => {
    if (!aboutWindow) {
        aboutWindow = new BrowserWindow({
            width: 300,
            height: 200,
            parent: mainWindow,
            modal: true,
            frame: false
        });

        aboutWindow.on('closed', () => aboutWindow = null);
    }

    aboutWindow.loadURL(`file://${__dirname}/app/about.html`);
})
