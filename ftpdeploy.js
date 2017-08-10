var fs = require('fs');
var FtpClient = require('ftp-deploy');

console.log("Inside ftpUpload.js");

var nodeArg = function (argName) {
    var valIndex = -1;
    for (var index in process.argv) {
        if (process.argv.hasOwnProperty(index)) {
            var val = process.argv[index];
            if (val === argName) {
                valIndex = parseInt(index) + 1;
            } else if (parseInt(index) === valIndex) {
                return val;
            }
        }
    }
    return undefined;
}


if (process === null) {
    console.log("process is null");
} else {
    uploadToFTP();
}
function getFiles(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            files_.push({full_path: name, rel_path: files[i]});
        }
    }
    return files_;
}

function uploadToFTP() {
    var ftp = new FtpClient();
    var ftpConfig = getConfiguration();

    console.log("ftp.host =" + ftpConfig.host);
    console.log("ftp.username =" + ftpConfig.username);
    console.log("ftp.password length =" + ftpConfig.password.length);
    console.log("ftp.localRoot =" + ftpConfig.localRoot);
    console.log("ftp.remoteRoot =" + ftpConfig.remoteRoot);
    console.log("ftp.port =" + ftpConfig.port);

    ftp.deploy(ftpConfig, function (err, fileName) {
        if (err) {
            console.log("error " + err);
        } else {
            console.log("Completed uploading");
        }
    });
}
function getConfiguration() {
    var ftpUser = nodeArg("--FTP-USER");
    var ftpPwd = nodeArg("--FTP-PWD");
    var ftpHost = nodeArg("--FTP-HOST");
    return {
        host: ftpHost,
        port: 21,
        username: ftpUser,
        password: ftpPwd,
        localRoot: "dist",
        remoteRoot: "/"
    };
}