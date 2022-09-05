const express = require('express')
const app = express()
const socketIO = require('socket.io')
const http = require('http')

const server = http.createServer(app)
const io = socketIO(server)


const path = require('path')


// configuraciones 
app.set('port', process.env.PORT || 3000)


// middleware

//socket
require('./socket.js')(io)


//Archivos estaticos 
app.use(express.static(path.join(__dirname, 'public')))

//empezar el server 




server.listen(app.get('port'), () => {
    console.log('servidor ' + app.get('port') + " corriendo")
}
)
