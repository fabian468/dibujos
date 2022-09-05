function init() {

    let mouse = {
        click: false,
        move: false,
        pos: {
            x: 0,
            y: 0
        },
        pos_prev: false
    }

    // canvas
    const canvas = document.getElementById('dibujo');
    const context = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width
    canvas.height = height


    const socket = io()




    canvas.addEventListener('mousedown', (e) => {
        mouse.click = true;

    })

    canvas.addEventListener('mouseup', (e) => {
        mouse.click = false;

    })

    canvas.addEventListener('mousemove', (e) => {
        mouse.pos.x = e.clientX / width;
        mouse.pos.y = e.clientY / height;
        mouse.move = true

    })

    socket.on('dibujoLinea', data => {
        const line = data.line
        context.beginPath()
        context.lineWidth = 2;
        context.moveTo(
            line[0].x * width,
            line[0].y * height)
        context.lineTo(
            line[1].x * width,
            line[1].y * height)

        context.stroke()
    })


    function buclePrincipal() {
        if (mouse.click && mouse.move && mouse.pos_prev) {
            socket.emit('dibujoLinea', { line: [mouse.pos, mouse.pos_prev] })
            mouse.move = false
        }
        mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };
        setTimeout(buclePrincipal, 25)
    }

    buclePrincipal()

}

document.addEventListener('DOMContentLoaded', init)