export const priceFormat = (
  value: number,
  currency: string | undefined | null
) => {
  const floatValue = value / 100;
  return floatValue.toLocaleString('en-US', {
    style: 'currency',
    currency: currency ? currency : 'MNT',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
