const { app, BrowserWindow } = require('electron')
const path = require('path')

function carregarJanela() {

    const w = new BrowserWindow({
        width: 780,
        height: 280
    })

    w.setMenu(null)
    w.setResizable(false)
    w.loadFile(path.join('app', 'index.html'))
}

app.whenReady().then(carregarJanela)