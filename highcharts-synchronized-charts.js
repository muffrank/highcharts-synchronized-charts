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
            this.series.chart.tooltip.refresh(this); // Show the tooltip
            this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
        };

        /**
         * Synchronize zooming through the setExtremes event handler.
         */
        H.prototype.syncExtremes = function syncExtremes(e) {
            var thisChart = this.chart;

            if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
                Highcharts.each(Highcharts.charts, function (chart) {
                    if (chart !== thisChart) {
                        if (chart.xAxis[0].setExtremes) { // It is null while updating
                            chart.xAxis[0].setExtremes(
                                e.min,
                                e.max,
                                undefined,
                                false,
                                { trigger: 'syncExtremes' }
                            );
                        }
                    }
                });
            }
        }

    }(Highcharts));
    return (function () {


    }());
}));
