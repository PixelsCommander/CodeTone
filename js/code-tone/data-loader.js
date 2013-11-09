(function (w) {
    var HTMLToneDataLoader = function () {

    }

    var p = HTMLToneDataLoader.prototype;

    p.APIURL = './backend/graber.php';

    p.loadURLContent = function(URL) {
        $.get(p.APIURL + '?grabURL=' + URL, this.onContentLoaded.bind(this));
    }

    p.onContentLoaded = function(data){
        var codeData = this.parseData(data);

        if (this.onDataParsed) {
            this.onDataParsed(codeData);
        }
    }

    p.parseData = function(data) {
        var parsedCodeLengths = [];
        var parsedCodeLines = [];
        var maximumLength = 0;
        var averageLength = 0;
        var totalLength = 0;

        var lines = data.match(/^.*((\r\n|\n|\r)|$)/gm);

        for (var i = 0; i < lines.length; i++) {
            var obj = lines[i];
            var numberOfSpacesToAddForTabs = (obj.split("\t").length - 1) * 4;

            for (var j = 0; j < numberOfSpacesToAddForTabs; j++) {
                obj = ' ' + obj;
            }

            parsedCodeLengths[i] = obj.length;
            parsedCodeLines.push(obj);

            maximumLength = Math.max(maximumLength, obj.length);
            totalLength += obj.length;
        }

        averageLength = totalLength / lines.length;

        return {text: data, lines: parsedCodeLines,values: parsedCodeLengths, maxLength: maximumLength, averageLength: averageLength};
    }

    w.HTMLToneDataLoader = HTMLToneDataLoader;
})(window);