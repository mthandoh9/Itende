function downloadFile(link)
{
    alert("inside");
    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {

        alert('file system open: ' + fs.name);
        alert(fs.root);
        getSampleFile(fs.root,link);
    }, onErrorLoadFs);
}
function getSampleFile(dirEntry,link) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', link, true);
    xhr.responseType = 'blob';

    var linkLength =link.legnth;
    var fileName = link.substring(35,linkLength-35);

    xhr.onload = function() {
        if (this.status == 200) {

            var blob = new Blob([this.response], { type: 'application/caustic' });
            saveFile(dirEntry, blob, fileName );
        }
    };
    xhr.send();
}
function saveFile(dirEntry, fileData, fileName) {

    dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {

        writeFile(fileEntry, fileData);

    }, onErrorCreateFile);
}
function writeFile(fileEntry, dataObj, isAppend) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            alert("Successful file write...");
            if (dataObj.type == "application/caustic") {
                readBinaryFile(fileEntry);
            }
            else {
                readFile(fileEntry);
            }
        };

        fileWriter.onerror = function(e) {
            alert("Failed file write: " + e.toString());
        };

        fileWriter.write(dataObj);
    });
}
//document.addEventListener("deviceready",onDeviceReady,false);