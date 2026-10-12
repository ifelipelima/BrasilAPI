export const formatZipCode = (zipCode) => {
  if (!zipCode) {
    return null;
  }

  const onlyNumbers = String(zipCode).replace(/\D/g, '');

  if (!onlyNumbers) {
    return null;
  }

  if (onlyNumbers.length === 8) {
    return `${onlyNumbers.slice(0, 5)}-${onlyNumbers.slice(5)}`;
  }

  return onlyNumbers;
};
