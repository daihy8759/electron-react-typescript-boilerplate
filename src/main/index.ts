import { app, BrowserWindow, powerSaveBlocker } from 'electron';
import * as path from 'path';
import * as url from 'url';
import store from '../shared/store';
import ipcMainSets from './ipcMainSets';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

const PROTOCOL = 'notary-remote-accept';

let win: BrowserWindow;

// 防止进入睡眠模式
powerSaveBlocker.start('prevent-display-sleep');

const createWindow = async () => {
    win = new BrowserWindow({
        show: false,
        width: 800,
        height: 520,
        resizable: false,
        autoHideMenuBar: true,
        maximizable: false,
        fullscreenable: false,
        frame: false,
        backgroundColor: 'none',
        titleBarStyle: 'hidden',
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true
        }
    });
    ipcMainSets(win);

    if (process.env.NODE_ENV !== 'production') {
        win.loadURL('http://localhost:2003');
    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    win.on('closed', () => {
        win = null;
    });

    win.webContents.on('did-finish-load', () => {
        try {
            win.show();
            win.focus();
            win.moveTop();
        } catch (ex) {}
    });

    // open devTools
    if (process.env.NODE_ENV !== 'production') {
        win.webContents.on('did-frame-finish-load', () => {
            win.webContents.once('devtools-opened', () => {
                win.focus();
            });
            win.webContents.openDevTools();
        });
    }
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
