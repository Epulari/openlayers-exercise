/**
 * Created by Epulari T on 3/16/2017.
 */

/** set map
 * para
 * var gotomap = new classGotoMap({
        mapTarget: 'map',
        mapSouce: new ol.source.OSM(),
        mapCenter: [0, 0],
        mapZoom: 2
    });
 */
var map;
var classGotoMap = function (mapOptions) {
    var mapSettiings = $.extend({
        mapTarget: 'map',
        mapSouce: new ol.source.OSM(),
        mapCenter: [0, 0],
        mapZoom: 2
    }, mapOptions);

    var accessibleSource = mapSettiings.mapSouce;
    var accessibleLayers = [
        new ol.layer.Tile({
            source: accessibleSource
        })
    ];
    var accessibleView = new ol.View({
        center: mapSettiings.mapCenter,
        zoom: mapSettiings.mapZoom
    });
    var themap = new ol.Map({
        layers: accessibleLayers,
        target: mapSettiings.mapTarget,
        view: accessibleView
    });
    map = themap;
};
