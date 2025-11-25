// Música via SoundCloud
// Certifique-se de adicionar o SDK no <head> do HTML:
// <script src="https://w.soundcloud.com/player/api.js"></script>

const iframeElement = document.createElement('iframe');
iframeElement.id = 'soundcloud-player';
iframeElement.width = '100%';
iframeElement.height = '166';
iframeElement.scrolling = 'no';
iframeElement.frameBorder = 'no';
iframeElement.allow = 'autoplay';
iframeElement.src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1111111111&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true";

// Adiciona o iframe ao body
document.body.appendChild(iframeElement);

// Inicializa o player
const widget = SC.Widget(iframeElement);

// Tocar/pausar música
function playMusic() {
    widget.play();
}

function pauseMusic() {
    widget.pause();
}

// Alterar volume (0 a 100)
function setVolume(vol) {
    widget.setVolume(vol);
}

// Tocar música automaticamente quando estiver pronto
widget.bind(SC.Widget.Events.READY, () => {
    widget.play();
});
