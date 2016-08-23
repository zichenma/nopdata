window.addEventListener("load", init);

function init() {
    var bHaveFileAPI = (window.File && window.FileReader);

    if (!bHaveFileAPI) {
        alert("This browser doesn't support the File API");
        return;
    }

    document.getElementById("fileElem").addEventListener("change", onFileChanged);
   
}

var eraseText = function (){
    document.getElementById("filecontents").value = "";
    
}

var checkDataEmpty = function () {
    var dataSource = document.getElementById("filecontents").value;
    if (dataSource !== '') {
        alert("Please reset your data feild by clicking Reset button!")
    }
}

function onFileChanged(theEvt) {
    var thefile = theEvt.target.files[0];

    var reader = new FileReader();

    reader.onload = function (evt) {
        var resultText = evt.target.result;
        document.getElementById('filecontents').innerHTML = resultText;
    }

    reader.readAsText(thefile);
}

var saveData = function () {

    var dataSource = document.getElementById("filecontents").value;
    window.localStorage.setItem("data", dataSource);
    
    document.getElementById('filecontents').innerHTML = "Your data has been saved!";
    return;
}

var clearData = function(){
    window.localStorage.clear();
    document.getElementById('filecontents').innerHTML = "Your data has been cleared!";
    return;
}

var showData = function () {
    //var jsonData = JSON.stringify(x2js.xml_str2json(localStorage["data"]));
    var jsonData = JSON.parse(localStorage["data"]);
    document.getElementById('filecontents').innerHTML = JSON.stringify(jsonData);
}
