window.inputToPlay = document.getElementById('inputToPlay');

window.playURLFromInput = function (e) {
    if (htmltone.player.playing === true) {
        htmltone.player.stop();
    } else {
        if (htmltone.URL === window.inputToPlay.value){
            htmltone.player.play();
        } else {
            if ((e === undefined || e.keyCode === 13 || e.keyCode === undefined) && window.inputToPlay.value.length > 0) {
                htmltone.load(window.inputToPlay.value);
            }
        }
    }
}

$(inputToPlay).on('keydown', window.playURLFromInput);
window.htmltone = new HTMLTone('.scrolling_pane');