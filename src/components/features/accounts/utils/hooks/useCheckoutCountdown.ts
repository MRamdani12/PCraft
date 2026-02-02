import { useEffect, useState } from "react";

/**
 * @param expiresAt Unix timestamp in seconds
 */

export function useCheckoutCountdown(expiresAt?: number | null) {
	const [remainingMs, setRemainingMs] = useState<number | null>(null);

	useEffect(() => {
		function update() {
			if (!expiresAt) return;
			const now = Date.now();
			const diff = expiresAt * 1000 - now;

			setRemainingMs(diff > 0 ? diff : 0);
		}

		update();
		const interval = setInterval(update, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [expiresAt]);

	return remainingMs;
}
