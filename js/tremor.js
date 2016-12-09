/**
 * Created by Galileo on 9/12/2016.
 *
 * Reactive Earth Tremors file
 */

var tremors = Rx.Observable.interval(2000).flatMap(function () {
    return Rx.DOM.jsonpRequest({
        url: TREMORS_URL,
        jsonpCallback: 'eqfeed_callback'
    }).retry(3)
}).flatMap(function (data) {
    return Rx.Observable.from(data.response.features)
}).distinct(function (tremor) {
    return tremor.properties.code;
});
tremors.subscribe(function (quake) {
    var coords = quake.geometry.coordinates;
    var size = quake.properties.mag * 10000;
    L.circle([coords[1], coords[0]], size, {'color': 'red'}).addTo(map);
});


