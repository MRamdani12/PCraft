import { useEffect, useState } from "react";

function FadeInOut({
	children,
	show,
	className,
	duration,
	delay,
	firstItem,
}: {
	children: React.ReactNode;
	show: boolean;
	className?: string;
	duration?: number;
	delay?: number;
	firstItem?: boolean;
}) {
	const [visible, setVisible] = useState(false);
	const [render, setRender] = useState(false);
	const [isFirst, setIsFirst] = useState(firstItem);
	const transitionDuration = duration || 200;
	const startDelay = delay || 0;

	useEffect(() => {
		let visibleTimeout: number;
		let renderTimeout: number;

		if (show) {
			if (isFirst) {
				visibleTimeout = setTimeout(() => setVisible(true), 10);
				renderTimeout = setTimeout(() => setRender(true), 0);
				// eslint-disable-next-line react-hooks/set-state-in-effect
				setIsFirst(false);
			}
			visibleTimeout = setTimeout(() => setVisible(true), startDelay + 10);
			renderTimeout = setTimeout(() => setRender(true), startDelay);
		} else {
			visibleTimeout = setTimeout(() => setVisible(false), 0);
			renderTimeout = setTimeout(
				() => setRender(false),
				transitionDuration + 20,
			);
		}

		return () => {
			clearTimeout(visibleTimeout);
			clearTimeout(renderTimeout);
		};
	}, [isFirst, show, startDelay, transitionDuration]);

	return (
		render && (
			<div
				className={`z-1000 transition-all duration-${transitionDuration} ${className}`}
				style={{
					opacity: `${visible ? "1" : "0"}`,
				}}
			>
				{children}
			</div>
		)
	);
}

export default FadeInOut;
