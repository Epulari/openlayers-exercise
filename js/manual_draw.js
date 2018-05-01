/**
 * Created by Epulari T on 4/27/2017.
 */

/** manul draw
 * para
 * var manuldraw = new classManualDraw({
        fillColor: 'rgba(255, 255, 255, 0.2)',
        strokeColor: '#ffcc33',
        strokeWidth: 2,
        imageRadius: 7,
        imageColor: '#ffcc33',
        drawtype:  'LineString', //Point/LineString/Polygon/Circle
        freehand: false
    });
 */
var classManualDraw = function (drawOptions) {
    var drawkSettings = $.extend({
        fillColor: 'rgba(255, 255, 255, 0.2)',
        strokeColor: '#ffcc33',
        strokeWidth: 2,
        imageRadius: 7,
        imageColor: '#ffcc33',
        drawtype: 'LineString', //Point/LineString/Polygon/Circle
        freehand: false
    }, drawOptions);
    var features = new ol.Collection();
    var featureOverlay = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: features,
            wrapX: false
        }),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: drawkSettings.fillColor
            }),
            stroke: new ol.style.Stroke({
                color: drawkSettings.strokeColor,
                width: drawkSettings.strokeWidth
            }),
            image: new ol.style.Circle({
                radius: drawkSettings.imageRadius,
                fill: new ol.style.Fill({
                    color: drawkSettings.imageColor
                })
            })
        })
    });
    //修改已经绘制的图形
    //将鼠标放到已绘制的图形附近，会被吸附到图形上，可对图形进行修改
    var modify = new ol.interaction.Modify({
        features: features,
        deleteCondition: function(event) {
            return ol.events.condition.shiftKeyOnly(event) &&
                ol.events.condition.singleClick(event);
        }
    });
    var draw;
    this.draw = function() {
        map.addLayer(featureOverlay);
        map.addInteraction(modify);
        draw = new ol.interaction.Draw({
            features: features,
            type: /** @type {ol.geom.GeometryType} */ drawkSettings.drawtype,
            freehand: drawkSettings.freehand
        });
        map.addInteraction(draw);
    }
    //关闭画图
    this.close = function () {
        map.removeInteraction(draw);
    }
}