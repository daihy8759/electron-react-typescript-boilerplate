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

// 自定义协议打开
const customProtocol = win => {
    let argv = process.argv;
    // 打开第一个窗口
    if (argv[argv.length - 1].indexOf(PROTOCOL + '://') > -1) {
        refreshWin(win, argv[argv.length - 1]);
    }
    // macos
    app.on('open-url', function(_, args) {
        refreshWin(win, args);
    });
    // windows
    app.on('second-instance', (_, args) => {
        refreshWin(win, args);
    });
};

const refreshWin = (win, args) => {
    const urlArray = args.split('?');
    if (urlArray.length > 1) {
        const params = urlArray[1].split(',');
        const paramJson = {};
        params.forEach(p => {
            const pArray = p.split('=');
            paramJson[pArray[0]] = pArray[1];
        });
        store.set('trtc-params', paramJson);
        win.webContents.send('enterRoom', paramJson);
    }
};

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
            customProtocol(win);
            win.show();
            win.focus();
            // 置于最顶层
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
