/**
 * Highcharts pin tooltip
 *
 * AUTHOR: Muhammad Umar Farooq
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return factory;
        });
    } else {
        factory(Highcharts);
    }
}(function (Highcharts) {
    (function (H) {

        /**
         * Override the reset function, we don't need to hide the tooltips and
         * crosshairs.
         */
        H.Pointer.prototype.reset = function () {
            return undefined;
        };

        /**
         * Highlight a point by showing tooltip, setting hover state and draw crosshair
         */
        H.Point.prototype.highlight = function (event) {
            event = this.series.chart.pointer.normalize(event);
            this.onMouseOver(); // Show the hover marker
            if(this.series.chart.tooltip.options.shared || this.series.chart.tooltip.options['split']){
                this.series.chart.tooltip.refresh([this]);
            }else{
                this.series.chart.tooltip.refresh(this);
            }
             // Show the tooltip
            this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
        };
        H.Point.prototype.unhighlight = function (event) {
            event = this.series.chart.pointer.normalize(event);
            this.onMouseOut(); // Show the hover marker
            if(this.series.chart.tooltip.options.shared || this.series.chart.tooltip.options['split']){
                this.series.chart.tooltip.hide([this]);
            }else{
                this.series.chart.tooltip.hide(this);
            }
            this.series.chart.xAxis[0].hideCrosshair();
        };

    }(Highcharts));
    return (function () {


    }());
}));
