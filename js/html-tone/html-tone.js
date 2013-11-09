(function (w) {
    var HTMLTone = function (selector) {
        this.loader = new HTMLToneDataLoader();
        this.player = new HTMLTonePlayer(selector);

        this.loader.onDataParsed = this.player.refreshData.bind(this.player);
    }

    var p = HTMLTone.prototype;

    p.load = function (URL) {
        this.URL = URL;
        this.loader.loadURLContent(URL);
    }

    w.HTMLTone = HTMLTone;
})(window);