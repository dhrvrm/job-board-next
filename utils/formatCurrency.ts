export function getFormatedCurrency(amount: number, currency: string) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency,
		maximumFractionDigits: 0,
	}).format(amount);
}
