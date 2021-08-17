function setCanvas(canvas, width, height, styleWidth, styleHeight){
    const hasPx = /px$/
    if(typeof styleWidth === 'string' && typeof styleHeight === 'string'){
        if(styleWidth.match(hasPx) === null && styleHeight.match(hasPx) === null){
            [styleWidth, styleHeight] = [styleWidth + 'px', styleHeight + 'px']
        }
    }
    else{
        [styleWidth, styleHeight] = [styleWidth + 'px', styleHeight + 'px']
    }
    [canvas.width, canvas.height] = [width, height]
    canvas.style.width = styleWidth
    canvas.style.height = styleHeight
}
function drawCells(canvas, crossX, crossY, cellColor, borderWidth, borderColor){
    const context = canvas.getContext('2d')
    const [canvasWidth, canvasHeight] = [context.canvas.width, context.canvas.height]
    const [cellWidth, cellHeight] = [canvasWidth / crossX, canvasHeight / crossY]
    
    for(let x = 0; x < crossX; x++){
        for(let y = 0; y < crossY; y++){
            const [offsetX, offsetY] = [x * cellWidth, y * cellHeight]
            context.fillStyle = cellColor
            context.fillRect(offsetX, offsetY, cellWidth, cellHeight)
            context.fillStyle = borderColor
            context.fillRect(offsetX + borderWidth, offsetY + borderWidth, cellWidth - 2 * borderWidth, cellHeight - 2 * borderWidth)
        }
    }
}
class Position{
    constructor(x, y){
        this.x = x
        this.y = y
    }
}
class Snake{
    constructor(startPos, length = 5, direction = Snake.Direction.up, color = 'grey', size = 8){
        this.direction = direction
        this.positionsArray = []
        this.positionsArray.length = length
        this.positionsArray[0] = startPos
        this.color = color
        this.size = size
        this.lastMove = direction
        this.isAdded = false
        this.updateArray(true)
    }
    updateArray(isFirst){
        const currentHead = this.positionsArray[0]
        switch(this.direction){
            case Snake.Direction.up:
                if(isFirst){
                    const pos = this.positionsArray
                    for(let i = 0; i < pos.length; i++){
                        if(i === 0){
                            continue;
                        }
                        let first = pos[0]
                        pos[i] = new Position(first.x, first.y + i)
                    }
                } 
                else{
                    const newPositionsArray = []
                    const {x, y} = this.positionsArray[0]
                    const newHead = new Position(x, y - 1)
                    newPositionsArray.unshift(newHead)
                    if(this.isAdded === true) {
                        for(let pos = 1; pos < this.positionsArray.length; pos++){
                            newPositionsArray[pos] = this.positionsArray[pos - 1]
                        }
                        newPositionsArray[this.positionsArray.length] = this.positionsArray[this.positionsArray.length - 1]
                        this.positionsArray = newPositionsArray
                        this.isAdded = false
                        return
                    }
                    for(let pos = 1; pos < this.positionsArray.length; pos++){
                        newPositionsArray[pos] = this.positionsArray[pos - 1]
                    }
                    this.positionsArray = newPositionsArray
                }
                break;
            case Snake.Direction.down:
                if(isFirst){
                    const pos = this.positionsArray
                    for(let i = 0; i < pos.length; i++){
                        if(i === 0){
                            continue;
                        }
                        let first = pos[0]
                        pos[i] = new Position(first.x, first.y - i)
                    }
                }
                else{
                    const newPositionsArray = []
                    const {x, y} = this.positionsArray[0]
                    const newHead = new Position(x, y + 1)
                    newPositionsArray.unshift(newHead)
                    if(this.isAdded === true) {
                        for(let pos = 1; pos < this.positionsArray.length; pos++){
                            newPositionsArray[pos] = this.positionsArray[pos - 1]
                        }
                        newPositionsArray[this.positionsArray.length] = this.positionsArray[this.positionsArray.length - 1]
                        this.positionsArray = newPositionsArray
                        this.isAdded = false
                        return
                    }
                    for(let pos = 1; pos < this.positionsArray.length; pos++){
                        newPositionsArray[pos] = this.positionsArray[pos - 1]
                    }
                    this.positionsArray = newPositionsArray
                }
                break;
            case Snake.Direction.right:
                if(isFirst){
                    const pos = this.positionsArray
                    for(let i = 0; i < pos.length; i++){
                        if(i === 0){
                            continue;
                        }
                        let first = pos[0]
                        pos[i] = new Position(first.x - i, first.y)
                    }
                }
                else{
                    const newPositionsArray = []
                    const {x, y} = this.positionsArray[0]
                    const newHead = new Position(x + 1, y)
                    newPositionsArray.unshift(newHead)
                    if(this.isAdded === true) {
                        for(let pos = 1; pos < this.positionsArray.length; pos++){
                            newPositionsArray[pos] = this.positionsArray[pos - 1]
                        }
                        newPositionsArray[this.positionsArray.length] = this.positionsArray[this.positionsArray.length - 1]
                        this.positionsArray = newPositionsArray
                        this.isAdded = false
                        return
                    }
                    for(let pos = 1; pos < this.positionsArray.length; pos++){
                        newPositionsArray[pos] = this.positionsArray[pos - 1]
                    }
                    this.positionsArray = newPositionsArray
                }
                break;
            case Snake.Direction.left:
                if(isFirst){
                    const pos = this.positionsArray
                    for(let i = 0; i < pos.length; i++){
                        if(i === 0){
                            continue;
                        }
                        let first = pos[0]
                        pos[i] = new Position(first.x + i, first.y)
                    }
                }
                else{
                    const newPositionsArray = []
                    const {x, y} = this.positionsArray[0]
                    const newHead = new Position(x - 1, y)
                    newPositionsArray.unshift(newHead)
                    if(this.isAdded === true) {
                        for(let pos = 1; pos < this.positionsArray.length; pos++){
                            newPositionsArray[pos] = this.positionsArray[pos - 1]
                        }
                        newPositionsArray[this.positionsArray.length] = this.positionsArray[this.positionsArray.length - 1]
                        this.positionsArray = newPositionsArray
                        this.isAdded = false
                        return
                    }
                    for(let pos = 1; pos < this.positionsArray.length; pos++){
                        newPositionsArray[pos] = this.positionsArray[pos - 1]
                    }
                    this.positionsArray = newPositionsArray
                }
                break;
            default:
                console.log('Default')
        }
    }
    static Direction = {
        up: 'up',
        down: 'down',
        right: 'right',
        left: 'left'
    }  
} 
function renderSnake(canvas, snake, crossX, crossY){
    snake.updateArray(false)
    const context = canvas.getContext('2d')
    context.fillStyle = snake.color
    const [canvasWidth, canvasHeight] = [context.canvas.width, context.canvas.height]
    const [cellWidth, cellHeight] = [canvasWidth / crossX, canvasHeight / crossY]
    for(const {x, y} of snake.positionsArray){
        const [offsetX, offsetY] = [x * cellWidth + ((cellWidth - snake.size) / 2), y * cellHeight + ((cellHeight - snake.size) / 2)]
        context.fillRect(offsetX, offsetY, snake.size, snake.size)
    }
}
function renderLoop(window, canvas, interval, snake, crossX, crossY, cellColor, borderWidth, borderColor, sizes, apple, state){
    const canvasClickCallback = event => {
        const [offsetX, offsetY] = calculateOffset(canvas, 45, 45)
        const [widthX, heightY] = calculateOffset(canvas, 55, 55)
    }
    const navigationCallback = event => {
        const keyCode = event.keyCode // up 38 down 40 right 39 left 37
        switch(keyCode){
            case 38: // up
                if(snake.direction === Snake.Direction.up || snake.direction === Snake.Direction.down){return}
                if(snake.lastMove === Snake.Direction.up || snake.lastMove === Snake.Direction.down){return}
                snake.direction = Snake.Direction.up
                break
            case 40: // down
                if(snake.direction === Snake.Direction.up || snake.direction === Snake.Direction.down){return}
                if(snake.lastMove === Snake.Direction.up || snake.lastMove === Snake.Direction.down){return}
                snake.direction = Snake.Direction.down
                break
            case 39: //right
                if(snake.direction === Snake.Direction.right || snake.direction === Snake.Direction.left){return}
                if(snake.lastMove === Snake.Direction.right || snake.lastMove === Snake.Direction.left){return}
                snake.direction = Snake.Direction.right
                break
            case 37: // left
                if(snake.direction === Snake.Direction.right || snake.direction === Snake.Direction.left){return}
                if(snake.lastMove === Snake.Direction.right || snake.lastMove === Snake.Direction.left){return}
                snake.direction = Snake.Direction.left
                break
            default:
                //snake.direction = Snake.Direction.up
                console.log(snake.direction)
        }
    }
    let isFinished = false
    let messageLoopID
    let fromPauseCallbackID
    const pauseCallback = event => {
        const keyCode = event.keyCode
        if(keyCode === 27){
            if(isPaused === false && isFinished === false){
                window.removeEventListener('keydown', navigationCallback)
                clearInterval(loop)
                messageLoopID = drawMessage(canvas, canvasData, 500, 'yellow', 'Game Paused!', messageTypes.pause, canvasClickCallback)
                canvas.addEventListener('click', canvasClickCallback)
                isPaused = true
            }
            else if(isFinished === false && isPaused === true){
                fromPauseCallbackID = setTimeout(() => {
                    isPaused = false
                    window.addEventListener('keydown', navigationCallback)
                    loopCallback()
                    clearInterval(loop)
                    loop = setInterval(loopCallback, interval)
                    clearInterval(messageLoopID)
                    canvas.removeEventListener('click', canvasClickCallback)
                }, (Date.now() - timeBeforeUpdate) % 500)
            }
        }
    }
    window.addEventListener('keydown', navigationCallback)
    let failMessageID
    let isPaused = false
    let timeBeforeUpdate = Date.now()
    let canvasData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
    const loopCallback = () => {
        if(isCollised(snake, crossX, crossY, apple, canvas, state)){
            clearInterval(loop)
            window.removeEventListener('keydown', navigationCallback)
            window.removeEventListener('keydown', pauseCallback)
            failMessageID = drawMessage(canvas, canvasData, 3000, 'red', `Game Over!\nYour score is ${state.currentScore}`, messageTypes.fail, canvasClickCallback)
            isFinished = true
            console.log(failMessageID)
            return
        }
        setCanvas(canvas, ...sizes)
        drawCells(canvas, crossX, crossY, cellColor, borderWidth, borderColor)
        snake.lastMove = snake.direction
        renderSnake(canvas, snake, crossX, crossY)
        drawApple(canvas, apple, snake, state)
        drawCurrentScore(canvas, state)
        const context = canvas.getContext('2d')
        canvasData = context.getImageData(0, 0, canvas.width, canvas.height)
    }
    let loop = setInterval(loopCallback, interval)
    window.addEventListener('keydown', pauseCallback)
}
function isCollised(snake, crossX, crossY){
    const positions = snake.positionsArray
    let {x, y} = positions[0]
    const direction = snake.direction
    switch(direction){
        case Snake.Direction.up:
            y--
            break
        case Snake.Direction.down:
            y++
            break
        case Snake.Direction.right:
            x++
            break
        case Snake.Direction.left:
            x--
            break
    }
    if((x === -1 || x === crossX) || (y === -1 || y === crossY)) {

        return true
    }
    for(const {x: currentX, y: currentY} of positions){
        if(x === currentX && y === currentY) return true
        else continue
    }

}
function drawApple(canvas, apple, snake, state){
    if(typeof drawApple.isFirst === 'undefined') drawApple.isFirst = true
    const context = canvas.getContext('2d')
    context.fillStyle = apple.color
    const [canvasWidth, canvasHeight] = [context.canvas.width, context.canvas.height]
    const [cellWidth, cellHeight] = [canvasWidth / apple.crossX, canvasHeight / apple.crossY]
    let offsetX = cellWidth * apple.x + cellWidth / 2
    let offsetY = cellHeight * apple.y + cellHeight / 2
    let isFirst = true
    main: do{
        for(const {x, y} of snake.positionsArray){
            if((x === apple.x && y === apple.y) || (apple.x === apple.crossX) || (apple.y === apple.crossY)){
                if(x === apple.x && y === apple.y && isFirst === true && drawApple.isFirst === false) {
                    state.currentScore++
                    snake.isAdded = true
                }
                apple.generate()
                offsetX = cellWidth * apple.x + cellWidth / 2
                offsetY = cellHeight * apple.y + cellHeight / 2
                isFirst = false
                continue main
            }
        }
        break main
    } while(true)
    context.arc(offsetX, offsetY, apple.radius, 0, 2 * Math.PI, false)
    context.fill()
    drawApple.isFirst = false
}
class Apple{
    constructor(crossX, crossY, radius, color = 'red'){
        this.crossX = crossX
        this.crossY = crossY
        this.x = null, this.y = null
        this.radius = radius
        this.color = color
        this.generate()
    }
    generate(){
        this.x = Math.round(Math.random() * this.crossX)
        this.y = Math.round(Math.random() * this.crossY)
    }
}
class GlobalState {
    constructor(currentScore = 0, font, color) {
        this.currentScore = currentScore
        this.font = font
        this.color = color
    }
}
function drawCurrentScore(canvas, state){
    const context = canvas.getContext('2d')
    context.font = state.font
    const score = state.currentScore
    context.fillStyle = state.color
    context.fillText(String(score), 10, 10)
}
function saveCanvasData(canvas){
    const context = canvas.getContext('2d')
    return context.getImageData(0, 0, canvas.width, canvas.height)
}
function restoreCanvasData(canvas, canvasData){
    const context = canvas.getContext('2d')
    context.putImageData(canvasData, canvas.width, canvas.height)
}
function drawMessage(canvas, canvasData, animationDuration, color, text, type, callback){
    const context = canvas.getContext('2d')
    const startTime = Date.now()
    const animationLength = canvas.width / 2
    const yOffset = canvas.height / 2
    const loop = setInterval(() => {
        const currentTime = Date.now()
        const dTime = currentTime - startTime
        let completedPath = animationLength * (dTime / (animationDuration / 100) / 100)
        if(completedPath >= animationLength){
            clearInterval(loop)
            return
        }
        context.putImageData(canvasData, 0, 0)
        context.fillStyle = color
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.font = '250% serif'
        if(type === messageTypes.fail){
            const header = text.split('\n')
            context.textBaseline = 'bottom'
            context.fillText(header[0], completedPath, yOffset)
            context.textBaseline = 'top'
            context.fillText(header[1], completedPath, yOffset)
        }
        else if(type === messageTypes.pause){
            context.fillText(text, completedPath, yOffset)
        }
    }, 5)
    return loop
}
function calculateOffset(canvas, percentX, percentY){
    const [canvasStyleWidth, canvasStyleHeight] = [parseInt(canvas.style.width), parseInt(canvas.style.height)]
    const offsetX = canvasStyleWidth * (percentX / 100)
    const offsetY = canvasStyleHeight * (percentY / 100)
    return [offsetX, offsetY]
}

const messageTypes = {
    fail: 'fail',
    pause: 'pause'
}

const sizes = [250, 250, 750, 750]
const mainCanvas = document.querySelector('#canvas')
const snake = new Snake(new Position(5, 5), 6, Snake.Direction.up)
const [crossX, crossY] = [10, 10]
const apple = new Apple(crossX, crossY, 5)
const state = new GlobalState(0, '10px serif', 'green')

setCanvas(mainCanvas, ...sizes)
drawCells(mainCanvas, crossX, crossY, 'black', 1, 'white')
renderSnake(mainCanvas, snake, crossX, crossY)
drawApple(mainCanvas, apple, snake, state)
drawCurrentScore(mainCanvas, state)
renderLoop(window, mainCanvas, 500, snake, crossX, crossY, 'black', 1, 'white', sizes, apple, state)