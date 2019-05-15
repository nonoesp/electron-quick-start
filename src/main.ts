import { app, BrowserWindow } from "electron";
import * as express from "express";
import * as http from "http";
import * as path from "path";
import { Environments } from "./enums/enums";

import { client } from 'electron-connect';

declare var __dirname: string;

const WEB_SERVER_PORT = 3001;

// AGD-830: Use express web server in static mode to serve HTML and JS resources
const expressServer = express();
let activeWebServer: http.Server;
expressServer.set("port", WEB_SERVER_PORT);
expressServer.use(express.static(path.join(__dirname, "./" )));

// Save a reference to the window object, so that its not garbage collected
let mainWindow: Electron.BrowserWindow;

function openWindow(uri: string) {
    mainWindow = new BrowserWindow({
        height: 800,
        icon: path.join(__dirname, "src/assets/icons/png/64x64.png"),
        minHeight: 600,
        minWidth: 410,
        width: 1380,
    });

    mainWindow.loadURL(uri);

    mainWindow.on("close", () => app.quit());
    if (process.env.NODE_ENV === Environments.Development) {
        mainWindow.webContents.openDevTools({ mode: "undocked" });
        if (process.env.DEVTOOLS_REACT_PATH) {
            BrowserWindow.addDevToolsExtension(process.env.DEVTOOLS_REACT_PATH);
        } else {
            BrowserWindow.removeDevToolsExtension("React Developer Tools");
        }
        if (process.env.DEVTOOLS_REDUX_PATH) {
            BrowserWindow.addDevToolsExtension(process.env.DEVTOOLS_REDUX_PATH);
        } else {
            BrowserWindow.removeDevToolsExtension("Redux DevTools");
        }
    }
}

app.on("ready", () => {
    activeWebServer = expressServer.listen(WEB_SERVER_PORT);
    openWindow(`http://localhost:${WEB_SERVER_PORT}/index.html`);
    client.create(mainWindow);
});

app.on("window-all-closed", () => {
    activeWebServer.close();
    app.quit();
});
