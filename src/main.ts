import { app, App, BrowserWindow } from 'electron';
import * as path from "path";

class Main {

    static mainWindow: BrowserWindow;
    static application: App;

    private static createWindow() : BrowserWindow {
        const window = new BrowserWindow({ 
            width: 800, 
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
                nodeIntegration: true,
                webgl: true
            }
        });
        window.loadFile(path.join(__dirname, "../index.html"));
        
        // enable to turn on debugging tab
        //window.webContents.openDevTools({mode: 'bottom'});

        window.on('closed', Main.onClose);
        return window;
    }

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose() {
        Main.mainWindow = null;
    }

    private static onActivate() {
        if (Main.mainWindow === null) {
            Main.mainWindow = Main.createWindow();
        }
    }

    private static onReady() {
        Main.mainWindow = Main.createWindow();
    }

    static main(app: Electron.App) {
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
        Main.application.on('activate', Main.onActivate);
    }
}

Main.main(app);