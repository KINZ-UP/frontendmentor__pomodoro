import { formatTime } from '../utils.js';
import { renderTimer } from '../index.js';

export default class Timer {
  constructor(containers, circle, settings) {
    this.containers = containers;
    this.circle = circle;
    this.circumference = circle.getTotalLength();
    this.limit = { ...settings.time };
    this.tempLimit = { ...this.limit };

    this.buttonText = {
      on: 'PAUSE',
      paused: 'RESTART',
      standBy: 'START',
    };

    this.initialize();
    this.start();
  }

  initialize() {
    this.state = 'pomodoro';
    this.secondsLeft = this.limit[this.state] * 60;
    this.countCycle = 0;
    this.maxCycle = 2;
    this.isOn = 'standBy';
    this.timer = null;
    this.circle.setAttribute(
      'stroke-dasharray',
      `${this.circumference}, ${this.circumference}`
    );
    this.renderButton();
  }

  onClickButton() {
    switch (this.isOn) {
      case 'on': {
        this.pause();
        break;
      }
      case 'paused': {
        this.restart();
        break;
      }
      case 'standBy': {
        this.start();
        break;
      }
      default:
        break;
    }
    return;
  }

  renderTime() {
    renderTimer(this.containers.timer, this.secondsLeft);
    this.renderCircle();
  }
  renderCircle() {
    const currLength =
      (this.circumference / this.tempLimit[this.state]) *
      (this.tempLimit[this.state] - this.secondsLeft / 60);
    this.circle.setAttribute(
      'stroke-dasharray',
      `${currLength}, ${this.circumference}`
    );
  }

  renderState() {
    const $children = this.containers.state.children;
    for (let $child of $children) {
      if ($child.getAttribute('name') === this.state) {
        $child.classList.add('active');
      } else {
        $child.classList.remove('active');
      }
    }
  }

  renderButton() {
    this.containers.button.innerText = this.buttonText[this.isOn];
  }

  start() {
    this.tempLimit = { ...this.limit };
    this.restart();
  }

  restart() {
    this.isOn = 'on';
    this.renderButton();
    this.renderCircle();
    this.timer = setInterval(() => {
      this.update();
    }, 1000);
  }

  update() {
    if (this.secondsLeft === 0) {
      this.updateState();
      return;
    }
    this.updateTimeLeft();
  }

  updateState() {
    switch (this.state) {
      case 'pomodoro': {
        this.countCycle += 1;
        if (this.countCycle === this.maxCycle) {
          this.state = 'longBreak';
        } else {
          this.state = 'shortBreak';
        }
        break;
      }
      case 'shortBreak': {
        this.state = 'pomodoro';
        break;
      }
      case 'longBreak': {
        this.countCycle = 0;
        this.state = 'pomodoro';
        break;
      }
      default:
        break;
    }
    this.isOn = 'standBy';
    clearInterval(this.timer);
    this.secondsLeft = this.limit[this.state] * 60;
    this.circle.setAttribute(
      'stroke-dasharray',
      `${this.circumference}, ${this.circumference}`
    );

    renderTimer(this.containers.timer, this.secondsLeft);
    this.renderState();
    this.renderButton();
  }

  updateTimeLeft() {
    this.secondsLeft -= 1;
    this.renderTime();
  }

  pause() {
    clearInterval(this.timer);
    this.isOn = 'paused';
    this.containers.button.innerText = this.buttonText[this.isOn];
  }

  updateSetting(settings) {
    this.limit = { ...settings.time };
  }
}
