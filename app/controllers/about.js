let closeAboutAnchor = document.querySelector('#close-about');
closeAboutAnchor.addEventListener('click', () => ipcRenderer.send('close-about-window'));

let githubExternalAnchor = document.querySelector('#github-external');
githubExternalAnchor.addEventListener('click', () => openExternalLink("https://github.com/guilycst/exo-lexicon"));

let iconAuthorExternalAnchor = document.querySelector('#icon-author');
iconAuthorExternalAnchor.addEventListener('click', () => openExternalLink("https://www.flaticon.com/authors/freepik"));

let iconSourceExternalAnchor = document.querySelector('#icon-src');
iconSourceExternalAnchor.addEventListener('click', () => openExternalLink("https://www.flaticon.com"));

let electronVersion = document.querySelector('#electron-version');

window.onload = function(){
    electronVersion.textContent = getModuleVersion('electron');
}
