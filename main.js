const { app, BrowserWindow } = require('electron');
const path = require('path');
const ejse = require('ejs-electron')
const express = require('express');
const eapp = express();


// static files & default view engine
eapp.set("view engine","ejs")
eapp.use(express.static('public'));
eapp.use('/sass', express.static(__dirname + '/public/sass'));
eapp.use('/js', express.static(__dirname + '/public/js'));
eapp.use('/img', express.static(__dirname + '/public/img'));


//electron 

function createWindow () {
  const win = new BrowserWindow({
    
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // win.loadFile('index.html');
  win.loadFile( path.join(__dirname, 'viewsBetter/index.ejs'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});