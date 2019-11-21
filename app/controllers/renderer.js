let aboutAchor = document.querySelector('#about');
aboutAchor.addEventListener('click', () => ipcRenderer.send('open-about-window'));

ipcRenderer.on('render-server-list', (evt, arg) => {
    getTemplateString('server-list').then(template => {
        let rendered = Mustache.render(template, {
            servers: arg
        });
        document.querySelector('#server-list').innerHTML = rendered;
    });
});