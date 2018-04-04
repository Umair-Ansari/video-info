const electron =  require('electron');
const ffmpeg = require('fluent-ffmpeg')
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  // mainWindow.loadURL(`http://cielowigle.com/`);

  mainWindow.loadURL(`file:\\${__dirname}\\index.html`);

});

ipcMain.on("video:submit", (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    // console.log('video duration is : ',metadata.format.duration, " seconds")
    mainWindow.webContents.send(
      "video:metadata",
       metadata.format.duration
     );
  });
});
