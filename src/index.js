import Timer from './components/Timer.js';
import { formatTime } from './utils.js';
import { timeSetter } from './components/settings.js';

const $app = document.getElementById('app');
const $logo = document.getElementById('logo');
const $timer = document.getElementById('timer');
const $state = document.getElementById('state');
const $button = document.getElementById('go-stop');
const $circle = document.querySelector('circle');

const $settingContainer = document.getElementById('setting-container');
const $formContainers = $settingContainer.querySelector('.form-containers');
const $pomodoroContainer = timeSetter('pomodoro');
const $shortBreakContainer = timeSetter('short-break');
const $longBreakContainer = timeSetter('long-break');
$formContainers.appendChild($pomodoroContainer);
$formContainers.appendChild($shortBreakContainer);
$formContainers.appendChild($longBreakContainer);
const $pomodoro = $pomodoroContainer.querySelector('input');
const $shortBreak = $shortBreakContainer.querySelector('input');
const $longBreak = $longBreakContainer.querySelector('input');

const $settingBtn = document.getElementById('setting-button');
const $settingCloseBtn = $settingContainer.querySelector('.close-btn');
const $settingBack = $settingContainer.querySelector('.back');
const $settingApplyBtn = $settingContainer.querySelector('.apply-btn');
const $font = $settingContainer.querySelector('section.font');
const $color = $settingContainer.querySelector('section.color');

const $fontOptions = $font.querySelectorAll('.option');
const $colorOptions = $color.querySelectorAll('.option');

let font = null;
let color = null;

let settings = {
  time: {
    pomodoro: 50,
    shortBreak: 10,
    longBreak: 30,
  },
  font: 'Kumbh Sans',
  color: '#f87070',
};

let temp;
let timer;

window.onload = () => {
  initialize();
  $logo.onclick = () => {
    if (timer) {
      clearTimeout(timer.timer);
      timer.initialize();
    }
    initialize();
  };
  $button.onclick = onClickGoStop;
  $settingBtn.onclick = () => {
    $settingContainer.style.display = 'flex';
    temp = {
      pomodoro: $pomodoro.value,
      shortBreak: $shortBreak.value,
      longBreak: $longBreak.value,
    };
  };
  $settingCloseBtn.onclick = onCloseSetting;
  $settingBack.onclick = onCloseSetting;
  $settingApplyBtn.onclick = () => {
    $settingContainer.style.display = 'none';
    if ($pomodoro.value > 1) {
      settings.time.pomodoro = $pomodoro.value;
    } else {
      settings.time.pomodoro = 1;
      $pomodoro.value = 1;
    }
    if ($shortBreak.value > 1) {
      settings.time.shortBreak = $shortBreak.value;
    } else {
      settings.time.shortBreak = 1;
      $shortBreak.value = 1;
    }
    if ($longBreak.value > 1) {
      settings.time.longBreak = $longBreak.value;
    } else {
      settings.time.longBreak = 1;
      $longBreak.value = 1;
    }
    if (font) settings.font = font;
    if (color) settings.color = color;
    $app.style.fontFamily = font;
    $app.style.setProperty('--main-color', color);
    if (timer) {
      timer.updateSetting(settings);
    }
    if (!timer) {
      renderTimer($timer, settings.time.pomodoro * 60);
    }
    localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
  };

  onClickOptions($fontOptions, 'font');
  onClickOptions($colorOptions, 'color');
};

function onClickGoStop() {
  if (!timer) {
    const containers = {
      timer: $timer,
      state: $state,
      button: $button,
    };
    timer = new Timer(containers, $circle, settings);
    return;
  }

  timer.onClickButton();
}

function initialize() {
  const savedSetting = localStorage.getItem('pomodoro-settings');
  if (savedSetting) {
    settings = JSON.parse(savedSetting);
  }
  renderTimer($timer, settings.time.pomodoro * 60);
  $pomodoro.value = settings.time.pomodoro;
  $shortBreak.value = settings.time.shortBreak;
  $longBreak.value = settings.time.longBreak;
  $app.style.fontFamily = settings.font;
  $app.style.setProperty('--main-color', settings.color);
  $fontOptions.forEach(($option) => {
    if ($option.getAttribute('name') === settings.font) {
      $option.classList.add('active');
    } else {
      $option.classList.remove('active');
    }
  });
  $colorOptions.forEach(($option) => {
    if ($option.getAttribute('name') === settings.color) {
      $option.classList.add('active');
    } else {
      $option.classList.remove('active');
    }
  });
}

function onClickOptions($options, option) {
  $options.forEach(($option, idx) => {
    $option.addEventListener('click', () => {
      $options.forEach((_$option, _idx) => {
        if (idx === _idx) {
          _$option.classList.add('active');
        } else {
          _$option.classList.remove('active');
        }
      });

      if (option === 'font') {
        font = $option.getAttribute('name');
      } else {
        color = $option.getAttribute('name');
      }
      console.log(font, color);
    });
  });
}

function onCloseSetting() {
  $pomodoro.value = temp.pomodoro;
  $shortBreak.value = temp.shortBreak;
  $longBreak.value = temp.longBreak;
  $settingContainer.style.display = 'none';
}

export function renderTimer($timer, time) {
  const [min, sec] = formatTime(time);
  $timer.innerHTML = `
    <span>${min[0]}</span>
    <span>${min[1]}</span>
    <p>:</p>
    <span>${sec[0]}</span>
    <span>${sec[1]}</span>
  `;
}
