/**
 * Created by Epulari T on 3/30/2017.
 */

/** add mark
 * para
 * var mark = new classSetMark({
        markCoordinate: [0, 0],
        markAnchor: [0.5, 0.96],
        markImage: 'https://openlayers.org/en/v4.0.1/examples/data/icon.png',
    });
 */
var classSetMark = function (markOptions) {
    var markSettings = $.extend({
        markCoordinate: [0, 0],
        markAnchor: [0.5, 0.96],
        markImage: 'image/icon.png',
    }, markOptions);

    /** 设置点图层 */
    var markVectorSource = new ol.source.Vector();
    var markVectorLayer = new ol.layer.Vector({
        source: markVectorSource
    });
    var iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat(markSettings.markCoordinate))//纬度 经度
    });

    /** 创建点图标 */
    this.create = function () {
        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} **/({
                anchor: markSettings.markAnchor,
                src: markSettings.markImage,
                img: undefined,
                imgSize: undefined
            }))
        });
        iconFeature.setStyle(iconStyle);
        markVectorSource.addFeature(iconFeature);
        map.removeLayer(markVectorLayer);
        map.addLayer(markVectorLayer);

        /** 改变鼠标样式 */
        map.on('pointermove', function(evt) {
            map.getTargetElement().style.cursor =
                map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
        });
    }

    /** 删除点 */
    this.delete = function () {
        markVectorSource.removeFeature(iconFeature);
        map.removeLayer(markVectorLayer);  //只写这一句，则在同一个实例化方法里删除后不能再添加点，因为图层不再存在
        //map.addLayer(markVectorLayer);
    }

    /** 修改点图标
     *
     * @param markImage -the icon path
     */
    this.icon = function (markImage) {
        iconFeature.setStyle(new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                anchor: markSettings.markAnchor,
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: markImage,
                img: undefined,
                imgSize: undefined
            }))
        }));

        /** 使用img和imgSize来改变图片 */
        // var markIcon = new Image();
        // markIcon.src = markImage;
        // markIcon.width = 70;
        // markIcon.height = 70;
        // //markIcon.hidden = true;
        // var markPicture = document.getElementsByClassName("ol-unselectable")[0].appendChild(markIcon);
        // iconFeature.setStyle(new ol.style.Style({
        //     image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
        //         anchor: markSettings.markAnchor,
        //         src: undefined,
        //         img: markIcon,
        //         imgSize: [markIcon.width, markIcon.height]
        //     }))
        // }));

        /** 等比例缩小图片 */
        // if( markIcon.width > 50) {
        //     var scaling = 1 - (markIcon.width - 50) / markIcon.width;
        //     //计算缩小比例
        //     markIcon.width = markIcon.width * scaling;
        //     markIcon.height = markIcon.height * scaling;
        // }
    }

    /** add click event
     *
     * @param callback -Function
     *        callback(coordinate)
     */
    this.addEvtClick = function (callback) {
        var selectClick = new ol.interaction.Select({
            condition: ol.events.condition.click
        });
        if (selectClick !== null) {
            map.addInteraction(selectClick);
            selectClick.on('select', function(e) {
                var iconSelect = e.target;//获取事件对象，即产生这个事件的元素-->ol.interaction.Select
                var iconCollection = iconSelect.getFeatures();//获取这个事件绑定的features-->返回值是一个ol.Collection对象
                var iconFeatures = iconCollection.getArray();//获取这个集合的第一个元素-->真正的feature
                if(iconFeatures.length > 0){
                    //回调函数，点击事件的响应。
                    if($.isFunction(callback)) {
                        callback(iconFeatures[0].getGeometry().getCoordinates());
                    }
                    else {
                        alert("This is a click event!");
                    }
                }
            });
        }
    }

    /** show popu */
    this.showPopu = function () {
        this.addEvtClick(function (coordinate) {
            $("#popup").css("display", "block");
            var container = document.getElementById('popup');
            var closer = document.getElementById('popup-closer');
            var popOverlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
                element: container,
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                },
                offset: [10, -20]
            }));
            map.addOverlay(popOverlay);
            var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
            $("#popup-content").html('<p>You clicked here:</p>' + hdms + '</code>');
            popOverlay.setPosition(coordinate);
            closer.onclick = function() {
                popOverlay.setPosition(undefined);
                closer.blur();
                return false;
            };
        })
    } 
}