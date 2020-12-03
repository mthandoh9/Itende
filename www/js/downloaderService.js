

function checkIfFileExists(link, pathToSaveTo, fileName) {

    window.resolveLocalFileSystemURL(pathToSaveTo, function (entry) {
        var fileExists = function (fileEntry) {
            console.log("File " + fileEntry.fullPath + " exists!");
            showToast("File already Exists! at " + fileEntry.fullPath);
        }
        var fileDoesNotExist = function () {
            console.log("file does not exist");
            downloadFile(link, pathToSaveTo, fileName);
        }

        entry.getFile(fileName, { create: false, exclusive: false }, fileExists, fileDoesNotExist);
    }, getFSFail); //of requestFileSystem
}
function getFSFail(evt) {
    console.log(evt.target.error.code);
}

function downloadFile(link, pathToSaveTo, fileName) {
    let filePath = pathToSaveTo + fileName;
    let fileTransfer = new window.FileTransfer();
    let uri = encodeURI(decodeURIComponent(link));

    //showToast("Downloading...");
    // Downloading the file
    fileTransfer.download(
        uri,
        filePath,
        function (entry) {
            
            var mess = "File Saved at " + entry.fullPath;
            console.log(mess)
            showToast(mess);
            //window.plugins.toast.showShortTop(mess, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})
            var title = fileName + " Downloaded";
            console.log(title);
            //showNotification("rferfer", "erferf");
            console.log(
                "Successfully downloaded file, full path is " + entry.fullPath
            );
            console.log(entry);
            if (window.AdMob) AdMob.showInterstitial();
            var admobid = {};
            admobid = {
                banner: 'ca-app-pub-9845513592050657/2935628640',
                interstitial: 'ca-app-pub-9845513592050657/6715338970'
            };
            if (window.AdMob) AdMob.prepareInterstitial({ adId: admobid.interstitial, autoShow: false });
            window.plugins.toast.showShortTop(mess, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
        },
        function (error) {
            console.log("error");
            console.log(error);
        },
        false
    );
}
function showNotification(xx, xxx) {
    cordova.plugins.notification.local.schedule({
        title: xx,
        text: xxx,
        foreground: true
    });
}

function showToast(x) {
    window.plugins.toast.showLongBottom(
        x,
        function (a) {
            console.log("toast success: " + a);
        },
        function (b) {
            alert("toast error: " + b);
        }
    );

    // window.plugins.toast.showShortTop(
    //     "Downloading...",
    //     function (a) {
    //         console.log("toast success: " + a);
    //     },
    //     function (b) {
    //         alert("toast error: " + b);
    //     }
    // );
}

function checkFolderExists(base, folderName, link, pathToSaveTo, dFolderPath, iFolderPath, fileName) {

    var errorCallback = function (error) {
        console.log("Parent Name: " + error);
    };

    var dir = base + folderName;
    console.log("checking :" + dir);
    window.resolveLocalFileSystemURL(
        base,
        function (directoryEntry) {

            var success = function (e) {
                console.log("file exists: " + e);
                checkIfFileExists(link, pathToSaveTo, fileName);
                // downloadFile(link, dynamicPath);
            };
            var fail = function (e) {
                console.log("fail: " + e);
                if (folderName == "ItendeApp") {
                    console.log("before creating ItendeApp Folder " + link);
                    console.log("before creating ItendeApp Folder " + pathToSaveTo);
                    console.log("before creating ItendeApp Folder " + fileName);
                    createFolder(folderName);
                    downloadFile(link, pathToSaveTo, fileName);
                }
                if (folderName == "caustic") {
                    if (confirm("Caustic folder is not present! \nSave file in ItendeApp folder instead ?")) {
                        checkFolderExists(base, "ItendeApp", link, iFolderPath, dFolderPath, iFolderPath, fileName);
                    }
                    if (confirm("Download Caustic and Activation Key ?")) {
                        var causticlink = "https://techforest.co.za/Itende/caustic/Caustic.apk";
                        fileName = "Caustic.apk";
                        checkIfFileExists(causticlink, iFolderPath, fileName);
                        var causticKeylink = "https://techforest.co.za/Itende/caustic/CausticFullVersionKey.apk";
                        fileName2 = "CausticFullVersionKey.apk";
                        checkIfFileExists(causticKeylink, iFolderPath, fileName2);
                        alert("This short video will teach you about Caustic");
                        var videoLink = "https://youtu.be/kg2RZsPsPZ8";
                        openBrowser2(videoLink);
                    }

                }

            };
            directoryEntry.getDirectory(
                folderName, {
                create: false,
                exclusive: false
            },
                success,
                fail
            );
        },
        errorCallback
    );
}

function createFolder(folderName) {
    //let folderPath = cordova.file.externalRootDirectory + folderName;
    let root = cordova.file.externalRootDirectory;
    //if (checkFolderExists(root, folderName)) return;

    var errorCallback = function (error) {
        console.log("Parent Name: " + error);
    };

    window.resolveLocalFileSystemURL(
        root,
        function (directoryEntry) {
            var success = function (e) {
                console.log("success: " + e);
                showToast("ItendeApp Folder Created!");
            };
            var fail = function (e) {
                console.log("fail: " + e);
            };
            directoryEntry.getDirectory(
                folderName, {
                create: true,
                exclusive: false
            },
                success,
                fail
            );
        },
        errorCallback
    );
    // Retrieve an existing directory, or create it if it does not already exist
}


function saveFile(x) {


    if (!confirm("Download this file?"))
        return;
     
    window.plugins.toast.showShortTop("Staring Download...", function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    console.log(x + " received link")
    var query = "Save this file to Caustic songs folder?\nPress Cancel to save in ItendeApp folder";
    var isCaustic = confirm(query);

    var baseLink = "https://techforest.co.za/Itende/beats/";
    var baseLength = baseLink.length;
    var full = x.length;
    var fileName = x.substring(baseLength, full);

    let permissions = cordova.plugins.permissions;
    permissions.checkPermission(
        permissions.READ_EXTERNAL_STORAGE,
        checkPermissionCallback,
        null
    );

    function checkPermissionCallback(status) {
        console.log("checking permissions");
        console.log(status);
        if (!status.hasPermission) {
            var errorCallback = function () {
                console.warn("Storage permission is not turned on");
            };
            // Asking permission to the user
            permissions.requestPermission(
                permissions.READ_EXTERNAL_STORAGE,
                function (status) {
                    if (!status.hasPermission) {
                        errorCallback();
                    } else {
                        permissions.checkPermission(
                            permissions.WRITE_EXTERNAL_STORAGE,
                            checkPermissionCallback2,
                            null
                        );
                    }
                },
                errorCallback
            );
        } else {
            permissions.checkPermission(
                permissions.WRITE_EXTERNAL_STORAGE,
                checkPermissionCallback2,
                null
            );
        }
    }

    function checkPermissionCallback2(status) {
        let downloadFolderPath = cordova.file.externalRootDirectory + "download/";
        let ItendeAppFolderPath = cordova.file.externalRootDirectory + "ItendeApp/";
        let causticFolderPath = cordova.file.externalRootDirectory + "caustic/songs/";

        let root = cordova.file.externalRootDirectory;
        console.log("checking permissions");
        console.log(status);
        if (!status.hasPermission) {
            var errorCallback = function () {
                console.warn("Storage permission is not turned on");
            };
            // Asking permission to the user
            permissions.requestPermission(
                permissions.WRITE_EXTERNAL_STORAGE,
                function (status) {
                    if (!status.hasPermission) {
                        errorCallback();
                    } else {
                        // var query = "Save this file to Caustic songs folder?\nPress cancel for No";
                        // var isCaustic = false;//confirm(query);
                        var pathToSaveTo = isCaustic == true ? causticFolderPath : ItendeAppFolderPath;
                        var folderName = isCaustic == true ? "caustic" : "ItendeApp";
                        checkFolderExists(root, folderName, x, pathToSaveTo, downloadFolderPath, ItendeAppFolderPath, fileName);
                        //downloadFile(x, path);
                    }
                },
                errorCallback
            );
        } else {
            // var query = "Save this file to Caustic songs folder?\nPress cancel for No";
            // var isCaustic = false; confirm(query);
            var path = isCaustic == true ? causticFolderPath : ItendeAppFolderPath;
            var folderName = isCaustic == true ? "caustic" : "ItendeApp";
            checkFolderExists(root, folderName, x, path, downloadFolderPath, ItendeAppFolderPath, fileName);
        }
    }
}

// function onDeviceReady() {
//     StatusBar.overlaysWebView(false);
//     window.onbeforeunload = function () {
//       if (window.AdMob) AdMob.showInterstitial();
//     };
//   }
//   document.addEventListener("deviceready", onDeviceReady, false);

// not in use
function DownloadManagerFileSave(x) {
    if (window.AdMob) AdMob.showInterstitial();
    event.preventDefault();

    window.plugins.toast.showShortTop(
        "Downloading...",
        function (a) {
            console.log("toast success: " + a);
        },
        function (b) {
            alert("toast error: " + b);
        }
    );
    var fail = function (message) {
        window.plugins.toast.showLongBottom(
            "Error Occured! " + message,
            function (a) {
                console.log("toast success: " + a);
            },
            function (b) {
                alert("toast error: " + b);
            }
        );
    };
    var success = function (data) {
        window.plugins.toast.showLongBottom(
            "Success! " + data,
            function (a) {
                console.log("toast success: " + a);
            },
            function (b) {
                alert("toast error: " + b);
            }
        );
    };
    var baseLink = "https://techforest.co.za/Itende/beats/";
    var baseLength = baseLink.length;
    var full = x.length;
    var fileName = x.substring(baseLength, full);

    let permissions = cordova.plugins.permissions;
    permissions.checkPermission(
        permissions.READ_EXTERNAL_STORAGE,
        checkPermissionCallback,
        null
    );

    function checkPermissionCallback(status) {
        console.log("checking permissions");
        console.log(status);
        if (!status.hasPermission) {
            var errorCallback = function () {
                console.warn("Storage permission is not turned on");
            };
            // Asking permission to the user
            permissions.requestPermission(
                permissions.READ_EXTERNAL_STORAGE,
                function (status) {
                    if (!status.hasPermission) {
                        errorCallback();
                    } else {
                        permissions.checkPermission(
                            permissions.WRITE_EXTERNAL_STORAGE,
                            checkPermissionCallback2,
                            null
                        );
                    }
                },
                errorCallback
            );
        } else {
            permissions.checkPermission(
                permissions.WRITE_EXTERNAL_STORAGE,
                checkPermissionCallback2,
                null
            );
        }
    }

    function checkPermissionCallback2(status) {
        console.log("checking permissions");
        console.log(status);
        if (!status.hasPermission) {
            var errorCallback = function () {
                console.warn("Storage permission is not turned on");
            };
            // Asking permission to the user
            permissions.requestPermission(
                permissions.WRITE_EXTERNAL_STORAGE,
                function (status) {
                    if (!status.hasPermission) {
                        errorCallback();
                    } else {
                        cordova.plugins.DownloadManager.download(
                            x,
                            fileName,
                            success,
                            fail
                        );
                    }
                },
                errorCallback
            );
        } else {
            cordova.plugins.DownloadManager.download(x, fileName, success, fail);
        }
    }
}

function downloadFileOldMEthod(x) {
    if (window.AdMob) AdMob.showInterstitial();
    event.preventDefault();
    window.plugins.toast.showShortTop(
        "Downloading...",
        function (a) {
            console.log("toast success: " + a);
        },
        function (b) {
            alert("toast error: " + b);
        }
    );
    //after device is ready
    var fail = function (message) {
        window.plugins.toast.showLongBottom(
            "Error Occured!" + err,
            function (a) {
                console.log("toast success: " + a);
            },
            function (b) {
                alert("toast error: " + b);
            }
        );
    };
    var success = function (data) {
        console.log("succes");
        window.plugins.toast.showLongBottom(
            "Success!" + err,
            function (a) {
                console.log("toast success: " + a);
            },
            function (b) {
                alert("toast error: " + b);
            }
        );
    };
    var baseLink = "https://techforest.co.za/Itende/beats/";
    var baseLength = baseLink.length;
    var full = x.length;
    var fileName = x.substring(baseLength, full);
    cordova.plugins.DownloadManager.download(x, fileName, success, fail);
}

// Unused code
// function moveFile() {

//   cordova.plugins.DownloadManager.download(x, fileName, success, fail);

//   var storageLocation = "";
//   console.log(device.platform);
//   switch (device.platform) {

//     case "Android":
//       storageLocation = 'file:///storage/emulated/0/';
//       break;
//     case "iOS":
//       storageLocation = cordova.file.documentsDirectory;
//       break;
//   }

//   //var fileUri = "file:///data/user/0/com.ItendeStyle.Itende/files/Download/" + fileName;
//   var fileUri = "file:///storage/emulated/0/Android/data/com.ItendeStyle.Itende/files/Download/" + fileName;
//   console.log(fileUri);
//     var errorCallback = function (e) {
//       console.log("Error: " + e);
//     }
//     window.resolveLocalFileSystemURL(
//       fileUri,
//       function (fileEntry) {
//         //var parentEntry = storageLocation + "Download";
//         var parentEntry = new DirectoryEntry(cordova.file.externalRootDirectory + 'download/', null);
//         //var parentEntry = cordova.file.externalRootDirectory + 'download/' + fileName;
//         var success = function (e) {
//           console.log("success: " + e);
//         }
//         var fail = function (e) {
//           console.log("fail: " + e);
//         }
//         // move the file to a new directory and rename it
//         fileEntry.moveTo(parentEntry, fileName, success, fail);
//       },
//       errorCallback);
//   }