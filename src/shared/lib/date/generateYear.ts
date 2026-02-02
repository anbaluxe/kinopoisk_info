export function generateYear(count = 30): number[] {
	const yearNow = new Date().getFullYear()
	return Array.from({ length: count }, (_, i) => yearNow - i)
}
