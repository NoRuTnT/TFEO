export const addPhoneDash = function (phone: string) {
  const first = phone.slice(0, 3);
  const second = phone.slice(3, 7);
  const end = phone.slice(7, 11);
  return first + '-' + second + '-' + end;
};
