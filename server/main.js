const {app, BrowserWindow} = require('electron');
const path = require('path');
const express = require('express');
const eapp = express();
const ejse = require('ejs-electron');
const server = require("./server");
const port = 3000;

eapp.use(express.static(path.join(__dirname, '..', 'app', 'views')));
eapp.use('/sass', express.static(path.join( __dirname, '..', 'app', 'sass')));
eapp.use('/js', express.static(path.join( __dirname, '..', 'app', 'js')));
eapp.use('/img', express.static(path.join(__dirname, '..', 'app', 'img')));

let mainWindow = null;

// app.on('ready', () => {
//     mainWindow = new BrowserWindow();
//     mainWindow.loadURL(path.join('file://' + __dirname, '..', 'app', 'views', 'index.ejs'));
// });

app.on('ready', function() {
    express();
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        autoHideMenuBar: true,
        useContentSize: true,
        resizable: true,
    });
    mainWindow.loadURL(`http://localhost:${port}/`);
    mainWindow.focus();
    mainWindow.on('close', event => {
        mainWindow = null
    })
});