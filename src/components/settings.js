const Settings = () => {
  $settings = document.createElement('div');
  $settings.classList.add('setting');
  $settings.innerHTML = `
     <div class="setting">
        <div class="setting-header">
          <h2>Settings</h2>
          <img src="./assets/icon-close.svg" alt="close" />
        </div>
        <div class="setting-main">
          <section class="time">
            <h4>TIME (MINUTES)</h4>
            <div class="form-containers">
              <div class="form-container">
                <p>pomodoro</p>
                <div class="form-number">
                  <input type="number" name="pomodoro" id="pomodoro" />
                  <div class="arrow-wrapper">
                    <img src="./assets/icon-arrow-up.svg" alt="up" />
                    <img src="./assets/icon-arrow-down.svg" alt="up" />
                  </div>
                </div>
              </div>
              <div class="form-container">
                <p>short break</p>
                <div class="form-number">
                  <input type="number" name="pomodoro" id="pomodoro" />
                  <div class="arrow-wrapper">
                    <img src="./assets/icon-arrow-up.svg" alt="up" />
                    <img src="./assets/icon-arrow-down.svg" alt="up" />
                  </div>
                </div>
              </div>
              <div class="form-container">
                <p>long break</p>
                <div class="form-number">
                  <input type="number" name="pomodoro" id="pomodoro" />
                  <div class="arrow-wrapper">
                    <img src="./assets/icon-arrow-up.svg" alt="up" />
                    <img src="./assets/icon-arrow-down.svg" alt="up" />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="type-option font">
            <h4>FONT</h4>
            <div class="option" style="font-family: 'Kumbh Sans'">Aa</div>
            <div class="option" style="font-family: 'Roboto Slab'">Aa</div>
            <div class="option" style="font-family: 'Space Mono'">Aa</div>
          </section>
          <section class="type-option color">
            <h4>COLOR</h4>
            <div class="option" style="background-color: #f87070"></div>
            <div class="option" style="background-color: #70f3f8"></div>
            <div class="option" style="background-color: #d881f8"></div>
          </section>
        </div>
        <button>Apply</button>
      </div>
      <div class="back"></div>
  `;
  return $settings;
};
