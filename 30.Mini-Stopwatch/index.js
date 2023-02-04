// 1. 시작 기능
// 스톱워치가 시작하고, 스톱워치의 시간이 올라갑니다.
// 좌측의 리셋 L 버튼이 랩 L 버튼으로, 우측의 시작 S 버튼이 중단 S 버튼으로 변경됩니다.
import Stopwatch from "./stopwatch.js"

const stopwatch = new Stopwatch()

const $timer = document.getElementById('timer')
const $startStopBtn = document.getElementById('start-stop-btn')
const $lapResetBtn = document.getElementById('lap-reset-btn')
const $lapResetBtnLabel = document.getElementById('lap-reset-btn-label')
const $startStopBtnLabel = document.getElementById('start-stop-btn-label')
const $laps = document.getElementById('laps')

let isRunning = false
let interval

let $minLap, $maxLap

// 2.시간 포맷팅 구현
const formatString = (num) => (num < 10 ? '0'+num : num)

const formatTime = (centisecond) => {
  const min = formatString(parseInt(centisecond / 6000))
  const sec = formatString(parseInt((centisecond - 6000 * min) / 100))
  const centisec = formatString(centisecond % 100)

  return `${min}:${sec}.${centisec}`
}

const updateTime = (time) => {
  $timer.innerText = formatTime(time)
}

const onClickStartBtn = () => {
  stopwatch.start()
  interval = setInterval(() => {
    updateTime(stopwatch.centisecond)
  }, 10)
  $lapResetBtnLabel.innerText = '랩'
  $startStopBtnLabel.innerText = '중단'
}

const onClickStopBtn = () => {
  stopwatch.pause()
  clearInterval(interval)
  $lapResetBtnLabel.innerText = '리셋'
  $startStopBtnLabel.innerText = '시작'
}

const onClickStartStopBtn = () => {
  isRunning ? onClickStopBtn() : onClickStartBtn()

  isRunning = !isRunning
  $startStopBtn.classList.toggle('bg-green-600')
  $startStopBtn.classList.toggle('bg-red-600')
}

// 3.랩 기능
// 6.최단, 최장 기록 강조 효과
const colorMinMax = () => {
  $minLap.classList.add('text-green-600')
  $maxLap.classList.add('text-red-600')
}

const onClickLapBtn = () => {
  const [lapCount, lapTime] = stopwatch.createLap()
  const $lap = document.createElement('li')
  $lap.setAttribute('data-time', lapTime)
  $lap.classList.add('flex', 'justify-between', 'py-2', 'px-3', 'border-b-2')
  $lap.innerHTML = `
    <span>랩 ${lapCount}</span>
    <span>${formatTime(lapTime)}</span>
  `
  $laps.prepend($lap)

  if ($minLap === undefined) {
    $minLap = $lap
    return;
  }

  if ($maxLap === undefined) {
    if (lapTime < $minLap.dataset.time) {
      $maxLap = $minLap
      $minLap = $lap
    } else {
      $maxLap = $lap
    }
    colorMinMax()
    return
  }

  if (lapTime < $minLap.dataset.time) {
    $minLap.classList.remove('text-green-600')
    $minLap = $lap
  } else if (lapTime > $maxLap.dataset.time) {
    $maxLap.classList.remove('text-red-600')
    $maxLap = $lap
  }

  colorMinMax()
}

// 4.리셋 기능
const onClickResetBtn = () => {
  stopwatch.reset()
  updateTime(0)
  $laps.innerHTML = ''
  $minLap = undefined
  $maxLap = undefined
}

const onClickLapResetBtn = () => {
  isRunning ? onClickLapBtn() : onClickResetBtn()
}

$startStopBtn.addEventListener('click', onClickStartStopBtn)
$lapResetBtn.addEventListener('click', onClickLapResetBtn)

// 5.키보드 조작 기능
const onKeyDown = (e) => {
  switch (e.code) {
    case 'KeyL':
      onClickLapResetBtn()
      break;
    case 'KeyS':
      onClickStartStopBtn()
      break;
  }
}

document.addEventListener('keydown', onKeyDown)