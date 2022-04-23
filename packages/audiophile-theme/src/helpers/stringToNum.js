export const stringToNum = (string) => {
  let num = string.replace("€", "").replace(" ", "").replace(",", ".");
  return parseFloat(num);
};
