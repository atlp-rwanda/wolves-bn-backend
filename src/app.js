exports.isNumValid = (num) => {
  if (num >= 70) {
    return false;
  }
  if (num <= 10) {
    return false;
  }
  return true;
};
exports.sayHello = () => 'Hello';
