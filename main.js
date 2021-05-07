const { app, BrowserWindow } = require('electron');
const path = require('path');
const ejse = require('ejs-electron')
const express = require('express');
const eapp = express();


// Set the default templating engine to ejs
eapp.set("view engine","ejs")


function createWindow () {
  const win = new BrowserWindow({
    
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // win.loadFile('index.html');
  win.loadFile('views/index.ejs');
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