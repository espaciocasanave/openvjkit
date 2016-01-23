/**
 * Created by ushi on 07/01/16.
 */
var Spectrograph = (function () {
    function Spectrograph(sampleRate) {
        this.position = 0;
        this.SAMPLE_RATE = sampleRate;
    }
    Spectrograph.prototype.drawSpectrum = function (ctx, array) {
        var WIDTH = ctx.canvas.width;
        var HEIGHT = ctx.canvas.height;
        var COUNT = this.COUNT = array.length;
        this.SCALE = this.SAMPLE_RATE / (this.COUNT / 2);
        var w = WIDTH / (this.COUNT + 1);
        var scale = HEIGHT / 256;
        for (var i = 0; i < COUNT; i++) {
            var value = array[i];
            ctx.fillRect(i * w + 0.5, (HEIGHT - value * scale) + 0.5, w, HEIGHT);
        }
    };
    Spectrograph.prototype.drawSpectrum2 = function (ctx, array, mins, maxs) {
        var WIDTH = ctx.canvas.width;
        var HEIGHT = ctx.canvas.height;
        var COUNT = this.COUNT = array.length;
        var w = WIDTH / (this.COUNT + 1);
        var scale = HEIGHT / 256;
        for (var i = 0; i < COUNT; i++) {
            var value = 256 * (array[i] - mins[i]) / (maxs[i] - mins[i]);
            ctx.fillRect(i * w + 0.5, (HEIGHT - value * scale) + 0.5, w, HEIGHT);
        }
    };
    Spectrograph.prototype.drawSpectrum3 = function (ctx, array, mins, maxs) {
        var WIDTH = ctx.canvas.width;
        var HEIGHT = ctx.canvas.height;
        var COUNT = this.COUNT = array.length;
        var h = HEIGHT / (this.COUNT + 1);
        var position = this.position;
        for (var i = 0; i < COUNT; i++) {
            var value = Math.floor(256 * (array[i] - mins[i]) / (maxs[i] - mins[i]));
            ctx.fillStyle = 'rgb(' + value + ',' + value + ',' + value + ')';
            ctx.fillRect(position, i * h, 1, h);
        }
        position++;
        if (position > WIDTH)
            position = 0;
        this.position = position;
    };
    Spectrograph.prototype.drawRanges = function (ctx, ranges) {
        var WIDTH = ctx.canvas.width;
        var HEIGHT = ctx.canvas.height;
        var SCALE = this.SCALE;
        var w = WIDTH * 2 / (this.COUNT + 1);
        for (var j = 0; j < ranges.length; j++) {
            var range = ranges[j];
            var low = Math.ceil(range.low / SCALE);
            var high = Math.floor(range.high / SCALE);
            ctx.strokeRect(low * w + 0.5, 0.5, (high - low + 1) * w - 1, HEIGHT - 1);
        }
    };
    Spectrograph.prototype.drawLevels = function (ctx, ranges, levels) {
        var WIDTH = ctx.canvas.width;
        var HEIGHT = ctx.canvas.height;
        var COUNT = this.COUNT;
        var SCALE = this.SCALE;
        var w = WIDTH * 2 / (this.COUNT + 1);
        var scale = HEIGHT / 256;
        ctx.beginPath();
        for (var i = 0; i < ranges.length; i++) {
            var range = ranges[i];
            var low = Math.ceil(range.low / SCALE);
            var high = Math.floor(range.high / SCALE);
            ctx.moveTo(low * w + 0.5, HEIGHT - levels[i] * scale + 0.5);
            ctx.lineTo((high + 1) * w + 0.5, HEIGHT - levels[i] * scale + 0.5);
        }
        ctx.stroke();
    };
    return Spectrograph;
})();
