import { Link } from "react-router";

type ButtonSkewedProps = {
	children: React.ReactNode;
	className?: string;
	shapeColor?: string;
	alternate?: boolean;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	to?: string;
};

function ButtonSkewed({
	children,
	className,
	shapeColor = "black",
	alternate,
	onClick,
	to,
}: ButtonSkewedProps) {
	const fillButton = (
		<>
			<svg
				viewBox="0 0 286 47"
				className="absolute inset-0 h-full w-full transition duration-200 group-hover:opacity-0"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
			>
				<path d="M0 47H267L286 0H0V47Z" fill={shapeColor} />
			</svg>
			<svg
				className={`absolute inset-0 -z-1 h-full w-full opacity-0 transition duration-200 group-hover:opacity-100`}
				viewBox="0 0 286 47"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
			>
				<path
					d="M266.662 46.5L285.258 0.5H0.5V46.5H266.662Z"
					stroke={shapeColor}
				/>
			</svg>
		</>
	);
	const strokeButton = (
		<>
			<svg
				className={`absolute inset-0 h-full w-full rotate-x-180 rotate-y-180 transition duration-200 group-hover:opacity-0`}
				viewBox="0 0 286 47"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
			>
				<path
					d="M266.662 46.5L285.258 0.5H0.5V46.5H266.662Z"
					stroke={shapeColor}
				/>
			</svg>
			<svg
				viewBox="0 0 286 47"
				className="absolute inset-0 -z-1 h-full w-full rotate-x-180 rotate-y-180 opacity-0 transition duration-200 group-hover:opacity-100"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
			>
				<path d="M0 47H267L286 0H0V47Z" fill={shapeColor} />
			</svg>
		</>
	);

	if (to) {
		return (
			<Link
				className={`group relative flex cursor-pointer items-center justify-center py-3.5 ${alternate ? "text-black hover:text-white" : "text-white hover:text-black"} ${className}`}
				to={to}
			>
				<p className={`z-50`}>{children}</p>
				{alternate ? strokeButton : fillButton}
			</Link>
		);
	}

	return (
		<button
			onClick={onClick}
			className={`group relative flex cursor-pointer items-center justify-center py-3.5 ${alternate ? "text-black hover:text-white" : "text-white hover:text-black"} ${className}`}
		>
			<p className={`z-50`}>{children}</p>
			{alternate ? strokeButton : fillButton}
		</button>
	);
}

export default ButtonSkewed;
