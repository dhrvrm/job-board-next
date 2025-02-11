export function formatRelativeTime(date: Date) {
	let formatedTime;

	const now = new Date();
	const diffInMilliseconds = now.getTime() - date.getTime();
	const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

	if (diffInDays === 0) {
		formatedTime = 'Posted Today';
	} else if (diffInDays === 1) {
		formatedTime = 'Posted Yesterday';
	} else if (diffInDays > 1 && diffInDays < 30) {
		formatedTime = `Posted ${diffInDays} days ago`;
	} else {
		// Calculate approximate months (more accurate than simple division)
		const diffInMonths = Math.floor(diffInDays / 30);
		formatedTime = `Posted ${diffInMonths} months ago`;
	}

	return formatedTime;
}
