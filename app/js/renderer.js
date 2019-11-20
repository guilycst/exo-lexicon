let aboutAchor = document.querySelector('#about');
aboutAchor.addEventListener('click', () => ipcRenderer.send('open-about-window'));
