window.inputToPlay = document.getElementById('inputToPlay');
window.playButton = document.getElementById('playButton');

window.playURLFromInput = function (e) {
    if (htmltone.player.playing === true) {
        window.pauseCodeTone();
    } else {
        if (htmltone.URL === window.inputToPlay.value) {
            window.resumeCodeTone();
            htmltone.player.play();
        } else {
            if ((e === undefined || e.keyCode === 13 || e.keyCode === undefined) && window.inputToPlay.value.length > 0) {
                window.playCodeTone(window.inputToPlay.value);
            }
        }
    }
}

$(inputToPlay).on('keydown', window.playURLFromInput);
window.htmltone = new HTMLTone('.scrolling_pane');

if (window.queryString.url !== undefined) {
    $(window.inputToPlay).val(window.queryString.url)
    window.playCodeTone(window.queryString.url);
}

window.playCodeTone = function (url) {
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