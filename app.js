const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

const colors = ['#CC0033', '#009966', '#CCCCCC', '#33FFCC', 'violet', 'pink']

let time = 0
let score = 0



startBtn.addEventListener('click', (event) => {

    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {


    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})
board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()

    }
})


function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}



function createRandomCircle() {
    const circle = document.createElement('div')

    let size
    if (document.body.clientWidth <= 516) {
        size = getRandomNumber(15, 30)
    } else if (document.body.clientWidth <= 320) {
        size = getRandomNumber(20, 40)
    } else {
        size = getRandomNumber(20, 60)
    }

    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)



    circle.style.top = `${x}px`
    circle.style.left = `${y}px`
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`

    circle.classList.add('circle')
    board.append(circle)

    const color = getRandomColor()
    circle.style.backgroundColor = color


    function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min)
    }


    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)]
    }
}



function finishGame() {
    timeEl.parentNode.remove
    board.innerHTML = `<h1>Ваш счет: ${score}</h1>
    
    <button class="time-btn" onclick="window.location.reload()">↩️</button>`
}