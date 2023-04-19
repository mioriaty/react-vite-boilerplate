export function calculateTotalPrice(subTotal: number, taxPercent: number, discountPercent: number, shipping: number, amountPaid: number) {
  const tax = (subTotal * taxPercent) / 100;
  const discount = (subTotal * discountPercent) / 100;
  const total = subTotal + tax + shipping - discount;
  const balanceDue = total - amountPaid;

  return balanceDue.toFixed(2);
}
