import { ipcMain } from 'electron';

export default mainWindow => {
    ipcMain.on('close', () => {
        if (mainWindow) {
            console.log('close');
            mainWindow.close();
        }
    });
};
