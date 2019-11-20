window.ipcRenderer = require('electron').ipcRenderer;

window.openExternalLink = (link) => {
    let shell = require('electron').shell;
    shell.openExternal(link);
}

window.getModuleVersion = (module) => {
    return process.versions[module];
}