export function formatTime(s) {
  const minutes = Math.floor(s / 60);
  const seconds = s - minutes * 60;

  return [formatCipher(minutes), formatCipher(seconds)];
}

function formatCipher(num, digit = 2) {
  num = num.toString();
  while (num.length < digit) {
    num = '0' + num;
  }
  return num;
}
