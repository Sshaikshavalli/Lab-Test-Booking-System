const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

/** Format an indicative demo price, e.g. 1499 -> "₹1,499" */
export const formatPrice = (n) => fmt.format(Number(n) || 0);

/** Sum the indicative price of a list of test objects. */
export const sumPrices = (items) => items.reduce((s, i) => s + (Number(i?.price) || 0), 0);
