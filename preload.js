const fs = require('fs').promises;
window.ipcRenderer = require('electron').ipcRenderer;
window.Mustache = require('mustache');

window.openExternalLink = (link) => {
    let shell = require('electron').shell;
    shell.openExternal(link);
}

window.getModuleVersion = (module) => {
    return process.versions[module];
}

window.getTemplateString = (name) => {
    return fs.readFile(`${__dirname}/app/templates/${name}.mst`, 'utf-8');
}