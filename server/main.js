const {app, BrowserWindow} = require('electron');
const path = require('path');
const express = require('express');
const eapp = express();
const ejse = require('ejs-electron');
 

//
eapp.use(express.static(path.join(__dirname, '..', 'app', 'views')));
eapp.use('/sass', express.static(path.join( __dirname, '..', 'app', 'sass')));
eapp.use('/js', express.static(path.join( __dirname, '..', 'app', 'js')));
eapp.use('/img', express.static(path.join(__dirname, '..', 'app', 'img')));

let mainWindow;
 
app.on('ready', () => {
    mainWindow = new BrowserWindow()
    mainWindow.loadURL(path.join('file://' + __dirname, '..', 'app', 'views', 'index.ejs'))
})