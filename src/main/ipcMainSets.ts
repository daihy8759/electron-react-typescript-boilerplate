import { ipcMain } from 'electron';

export default (mainWindow, mainOpts: Electron.BrowserWindowConstructorOptions) => {
    ipcMain.on('resize-default', () => {
        mainWindow.setSize(mainOpts.width, mainOpts.height);
        mainWindow.center();
    });
    ipcMain.on('close', () => {
        if (mainWindow) {
            mainWindow.close();
        }
    });
};
