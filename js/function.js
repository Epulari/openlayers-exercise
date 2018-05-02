/**
 * Created by Epulari T on 3/30/2017.
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
var gotomap = new classGotoMap();

/** mark
 * para
 * var mark = new classSetMark({
        markCoordinate: [0, 0],
        markAnchor: [0.5, 0.96],
        markImage: 'https://openlayers.org/en/v4.0.1/examples/data/icon.png',
    });
 */
/** one point **/
function MarkTesting() {
    var mark = new classSetMark({
        markCoordinate: [80, -50]
    });
    $("#add-one-mark").click(function () {
        mark.create();
    });
    $("#icon-one-mark").click(function () {
        //@param markImage -the icon path
        mark.icon('image/mark1.png');
    });
    $("#del-one-mark").click(function () {
        mark.delete();
    });
    $("#click-one-mark").click(function () {
        //@param callback(coordinate) -Function
        mark.addEvtClick(function (/** @param coordinate */) {
            alert(123);
        });
    });
    $("#show-one-popu").click(function () {
        mark.showPopu();
    });
}
MarkTesting();
/** multiple points **/
function MarksTesting() {
    var mark = new Array();
    var markID = new Array();  // [[坐标对], 存放序号 删除或修改某一个点时
    var markCoordinates = [[0,0], [50, 60], [10, 80], [-50, 60], [-10, 80]];
    var len = markCoordinates.length;
    for (var i = 0; i < len; i++) {
        mark[i] = new classSetMark({
            markCoordinate: markCoordinates[i]
        });
        markID[i] = [markCoordinates[i], i];
        var k  = 0;
    }
    $("#add-multiple-mark").click(function () {
        for (var i = 0; i < len; i++) {
            mark[i].create();
        }
    });
    $("#icon-multiple-mark").click(function () {
        //@param markImage -the icon path
        for (var i = 0; i < len; i++) {
            mark[i].icon('image/mark1.png');
        }
    });
    $("#del-multiple-mark").click(function () {
        for (var i = 0; i < len; i++) {
            mark[i].delete();
        }
    });
    $("#click-multiple-mark").click(function () {
        //@param callback(coordinate) -Function
        for (var i = 0; i < len; i++) {
            mark[i].addEvtClick(function (/** @param coordinate */) {
                alert(123);
            });
        }
    });
    $("#show-multiple-popu").click(function () {
        for (var i = 0; i < len; i++) {
            mark[i].showPopu();
        }
    });
}
MarksTesting();

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
$("#draw-point").click(function () {
    var drawPoint = new classManualDraw({
        strokeColor: '#ff0088',
        imageColor: '#ff0088',
        drawtype:  'Point'
    });
    drawPoint.draw();
    $("#draw-close").click(function () {
        drawPoint.close();
    });
});
$("#draw-line").click(function () {
    var drawLine = new classManualDraw({
        strokeColor: '#ff0088',
        imageColor: '#ff0088',
        drawtype:  'LineString'
    });
    drawLine.draw();
    $("#draw-close").click(function () {
        drawLine.close();
    });
});
$("#draw-polygon").click(function () {
    var drawPolygon = new classManualDraw({
        strokeColor: '#ff0088',
        imageColor: '#ff0088',
        drawtype:  'Polygon'
    });
    drawPolygon.draw();
    $("#draw-close").click(function () {
        drawPolygon.close();
    });
});
$("#draw-circle").click(function () {
    var drawCircle = new classManualDraw({
        strokeColor: '#ff0088',
        imageColor: '#ff0088',
        drawtype:  'Circle'
    });
    drawCircle.draw();
    $("#draw-close").click(function () {
        drawCircle.close();
    });
});

/** map animation
 * para
 * var mark = new classMapAnimation({
        center: ol.proj.fromLonLat([0, 0]),
        zoom: 6
    });
 */
$("#animate-rotate-left").click(function () {
    var rotateL = new classMapAnimation();
    rotateL.rotateLeft();
});
$("#animate-rotate-right").click(function () {
    var rotateR = new classMapAnimation();
    rotateR.rotateRight();
});
$("#animate-elastic").click(function () {
    var elastic = new classMapAnimation();
    elastic.elastic();
});