import { app, BrowserWindow, BrowserWindowConstructorOptions, powerSaveBlocker } from 'electron';
import * as path from 'path';
import * as url from 'url';
import ipcMainSets from './ipcMainSets';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

let win: BrowserWindow;

// 防止进入睡眠模式
powerSaveBlocker.start('prevent-display-sleep');

const createWindow = async () => {
    const mainOpts: BrowserWindowConstructorOptions = {
        show: false,
        width: 800,
        height: 520,
        resizable: false,
        autoHideMenuBar: true,
        frame: false,
        backgroundColor: 'none',
        titleBarStyle: 'hidden',
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
        },
    };
    win = new BrowserWindow(mainOpts);
    ipcMainSets(win);

    if (process.env.NODE_ENV !== 'production') {
        await win.loadURL('http://localhost:2003');
        win.webContents.once('devtools-opened', () => {
            win.focus();
        });
        win.webContents.openDevTools();
    } else {
        await win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true,
            })
        );
    }

    win.on('closed', () => {
        win = null;
    });
    try {
        win.show();
        win.focus();
    } catch (ex) {}
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
