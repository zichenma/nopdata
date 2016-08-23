
var mapGraphic = function () {
    if (localStorage.getItem("data") === null) {
        alert("Please upload your data first!")
    }
    else {
        try {
            var data = JSON.parse(localStorage["data"]);
            renderMap(data);
        } catch (e) {
            return;
        }
    }
}
  
function renderMap(data) {
    var ip = [];
    var storeName = [];
        for (var i = 0; i <= data.Order.length; i++) {
            if (data.Order[i] != undefined)
                ip.push(data.Order[i].CustomerIp);
            if (data.Order[i] != undefined) {
                storeName.push(data.Order[i].CustomerId);
            }
        }
        map = new GMaps({
            el: '#map',
            zoom: 4,
            lat: 37.7510, //latitude
            lng: -97.8220 //longitude
        });
      
        for (var i = 0; i <= ip.length; i++) {
                $.get("http://ipinfo.io/" + ip[i].split(":")[0], function (response) {
                    var lats = response.loc.split(',')[0];
                    var lngs = response.loc.split(',')[1];
                    map.addMarker({
                        lat: lats,
                        lng: lngs,
                        icon: "img/jewelry.png",
                        infoWindow: {
                            content: '<p>Store</p>'
                        }
                    });
                }, "jsonp");
        }
    }
