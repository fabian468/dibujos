const { Socket } = require("socket.io")



module.exports = io => {

    var historialLinea = []



    io.on('connection', Socket => {

        for (let i in historialLinea) {
            Socket.emit('dibujoLinea', { line: historialLinea[i] })
        }


        console.log('nuevo cliente conectado')

        Socket.on('dibujoLinea', data => {
            historialLinea.push(data.line)
            io.emit('dibujoLinea', data)
        })
    })
}
