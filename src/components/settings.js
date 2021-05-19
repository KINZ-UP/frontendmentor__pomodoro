export const timeSetter = (type) => {
  const $formContainer = document.createElement('div');
  $formContainer.classList.add('form-container');
  $formContainer.innerHTML = `
    <p>${type.replace('-', ' ')}</p>
    <div class="form-number">
      <input
        type="number"
        name="${type}"
        id="${type}"
        min="1"
        max="100"
      />
      <div class="arrow-wrapper">
        <img class="up" src="./assets/icon-arrow-up.svg" alt="up" />
        <img class="down" src="./assets/icon-arrow-down.svg" alt="up" />
      </div>
    </div>
  `;
  const $input = $formContainer.querySelector('input');
  const $arrowUp = $formContainer.querySelector('.up');
  const $arrowDown = $formContainer.querySelector('.down');

  $arrowUp.onclick = () => {
    if ($input.value >= 100) return;
    $input.value++;
  };
  $arrowDown.onclick = () => {
    if ($input.value <= 1) return;
    $input.value--;
  };

  return $formContainer;
};
