const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toLocaleNumber = (value, language) => {
  const text = String(value ?? "");

  if (language !== "bn.bengali") {
    return text;
  }

  return text.replace(/\d/g, (digit) => bnDigits[Number(digit)]);
};
