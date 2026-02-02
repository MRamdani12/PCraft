export function generateTimeStampId() {
	const id = Date.now().toString(36).toUpperCase();
	const randomSuffix = Math.random().toString(36).substring(2, 4).toUpperCase();
	return id + randomSuffix;
}
