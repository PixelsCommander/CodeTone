(function (w) {
    var HTMLTonePlayer = function (selector) {
        this.initializeContainer(selector);
        this.initializeAudio();
        this.linesNodes = [];
    }

    var p = HTMLTonePlayer.prototype;
    p.speed = 50;
    p.lineHeight = 14;

    p.initializeContainer = function (selector) {
        this.container = document.querySelectorAll(selector)[0];
        this.containerOffsetWIdth = this.container.offsetWidth / 2;
    }

    p.initializeAudio = function () {
        var contextClass = (window.AudioContext ||
            window.webkitAudioContext ||
            window.mozAudioContext ||
            window.oAudioContext ||
            window.msAudioContext);

        if (contextClass) {
            this.audioContext = new contextClass();
        } else {
            alert('Web audio API is not supported');
        }
    }

    p.refreshData = function (dataObject) {
        this.linesNodes = [];
        this.container.innerHTML = '';
        this.data = dataObject;
        this.currentLine = 0;
        for (var i = 0; i < dataObject.lines.length; i++) {
            var obj = dataObject.lines[i];
            var element = document.createElement('div');
            element.className = 'code_line';
            element.style.left = i * this.lineHeight + 'px';
            $(element).text(obj);
            $(this.container).append(element);
            this.linesNodes.push(element);
        }

        this.play();
    }

    p.play = function () {
        this.oscOn();
        this.oscillator.start(0);
        this.interval = setInterval(this.playCurrentLineAndGoFurther.bind(this), this.speed);
        this.playing = true;
    }

    p.playCurrentLineAndGoFurther = function () {
        if (this.currentLine > 0) {
            this.linesNodes[this.currentLine - 1].className = 'code_line';
        }

        this.scrollToLine(this.currentLine);
        this.linesNodes[this.currentLine].className = 'code_line active ' + this.getCSSClassFromLength(this.data.values[this.currentLine]);
        this.playLine(this.data.values[this.currentLine]);
        this.currentLine++;

        if (this.currentLine === this.data.values.length) {
            this.currentLine = 0;
            window.pauseCodeTone();
        }
    }

    p.playLine = function (obj) {
        this.oscillator.noteOn(0);
        this.oscillator.frequency.value = obj * 2;
    }

    p.scrollToLine = function (lineNumber) {
        this.container.style.left = (this.containerOffsetWIdth - (lineNumber * this.lineHeight)) + 'px';
    }

    p.getCSSClassFromLength = function(lineLength) {
        if (lineLength / this.data.averageLength > 2) {
            return 'red';
        }

        if (lineLength / this.data.averageLength > 1.5) {
            return 'yellow';
        }

        return 'white';
    }

    p.stop = function() {
        clearInterval(this.interval);
        this.oscOff();
        this.playing = stop;
    }


    p.oscOn = function() {
        this.oscillator = this.audioContext.createOscillator();
        this.oscillator.type = this.oscillator.SQUARE;
        this.oscillator.connect(this.audioContext.destination);
    }

    p.oscOff = function() {
        this.oscillator.stop(0, 0);
    }

    w.HTMLTonePlayer = HTMLTonePlayer;
})(window);