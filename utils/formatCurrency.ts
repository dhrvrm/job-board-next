export function getFormatedCurrency(amount: number, currency: string = 'USD') {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency,
		maximumFractionDigits: 0,
	}).format(amount);
}
