export function calculateTotalPrice(subTotal: number, taxPercent: number, shipping: number) {
  const tax = (subTotal * taxPercent) / 100;
  const total = subTotal + tax + shipping;

  return total.toFixed(2);
}
