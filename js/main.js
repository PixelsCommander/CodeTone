window.inputToPlay = document.getElementById('inputToPlay');
window.playButton = document.getElementById('playButton');

window.playURLFromInput = function (e) {
    if (htmltone.player.playing === true) {
        window.pauseCodeTone();
    } else {
        if ((e === undefined || e.keyCode === 13 || e.keyCode === undefined) && window.inputToPlay.value.length > 0) {
            if (htmltone.URL === window.inputToPlay.value) {
                window.resumeCodeTone();
                htmltone.player.play();
            } else {
                window.playCodeTone(window.inputToPlay.value);
            }
        }
    }
}

$(inputToPlay).on('keydown', window.playURLFromInput);
window.htmltone = new HTMLTone('.scrolling_pane');

window.playCodeTone = function (url) {
    document.location.hash = url;
    htmltone.load(url);
    window.resumeCodeTone();
}

window.resumeCodeTone = function (url) {
    window.playButton.className = 'pause_site';
}

window.pauseCodeTone = function (url) {
    window.playButton.className = 'play_site';
    htmltone.player.stop();
}

if (document.location.hash.length > 0) {
    var urlToPlay = document.location.hash.replace('#','');
    $(window.inputToPlay).val(urlToPlay);
    window.playCodeTone(urlToPlay);
}