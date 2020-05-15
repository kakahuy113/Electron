(function(){
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
    const blockSize = 10

    let currentSnake = [[50, 100], [50, 90], [50, 80], [50, 70], [50, 60], [50, 50], [50, 40], [50, 30], [50, 20], [50, 10]]

    const clear = () => ctx.clearRect(0, 0, canvasXSize, canvasYSize)

    const render = snake => {
        clear()
        snake.forEach(([x, y]) => ctx.fillRect(x, y, blockSize, blockSize))
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
                currentSnake = move(currentSnake, 'left')
                render(currentSnake)
                if (hasCollision(currentSnake)) alert('Loser !')
                break;
            case keys.up:
                currentSnake = move(currentSnake, 'up')
                render(currentSnake)
                if (hasCollision(currentSnake)) alert('Loser !')
                break;
            case keys.right:
                currentSnake = move(currentSnake, 'right')
                render(currentSnake)
                if (hasCollision(currentSnake)) alert('Loser !')
                break;
            case keys.down:
                currentSnake = move(currentSnake, 'down')
                render(currentSnake)
                if (hasCollision(currentSnake)) alert('Loser !')
                break;
        }
    }

    render(currentSnake)
})()