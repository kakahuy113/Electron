(function(){
    const blockSize = 10
    const fps = 30
    
    const interval = 1000 / fps
    const mod = (n, m) => ((n % m) + m) % m
    const keys = {
        left: 37,
        up: 38,
        right: 39,
        down: 40
    }

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = "rgb(200, 0, 0)"

    const canvasXSize = canvas.width
    const canvasYSize = canvas.height

    let state = {
        snake: [[50, 100], [50, 90], [50, 80], [50, 70], [50, 60], [50, 50], [50, 40], [50, 30], [50, 20], [50, 10]],
        direction: 'down',
        running: true
    }

    const clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height)
    const render = state => {
        const {running, snake, direction} = state
        if (!running) return

        const newSnake = move(snake, direction)
        console.log(newSnake)

        clear()
        newSnake.forEach(([x, y]) => ctx.fillRect(x, y, blockSize, blockSize))

        if (hasCollision(newSnake)) { 
            alert('Loser !')
            running = false
        }

        return { ...state, snake: newSnake, running }
    }

    const moveHead = (head, direction) => {
        const [hx, hy] = head
        switch(direction){
            case 'left': return [mod(hx - blockSize, canvasXSize), hy]
            case 'up': return [hx, mod(hy - blockSize, canvasYSize)]
            case 'right': return [mod(hx + blockSize, canvasXSize), hy]
            case 'down': return [hx, mod(hy + blockSize, canvasYSize)]
        }
    }

    const move = (snake, direction) => {
        const head = snake[0]
        const newHead = moveHead(head, direction)
        const newTail = snake.slice(0, -1)
        return [newHead].concat(newTail)
    }

    const hasCollision = snake => {
        const [head, ...tail] = snake
        const [hx, hy] = head
        return tail.some(([x, y]) => x === hx && y === hy)
    }

    document.onkeydown = e => {
        switch(e.keyCode){
            case keys.left:
                state.direction = 'left'
                break;
            case keys.up:
                state.direction = 'up'
                break;
            case keys.right:
                state.direction = 'right'
                break;
            case keys.down:
                state.direction = 'down'
                break;
        }
    }

    const loop = () => {
        const currentTime = (new Date()).getTime()
        const delta = currentTime - lastTime
        if (delta > interval) {
            state = render(state)
            lastTime = currentTime
        }
        requestAnimationFrame(loop)
    }

    lastTime = (new Date()).getTime()
    requestAnimationFrame(loop)
})()