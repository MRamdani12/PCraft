import { Link } from "react-router";

type ReturnNavType = {
	children: React.ReactNode;
	className?: string;
	to?: string;
};

function ReturnNav({ children, className, to = ".." }: ReturnNavType) {
	return (
		<Link className={className} to={to}>
			<svg
				width="25"
				height="15"
				viewBox="0 0 25 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M0.292892 6.65691C-0.0976315 7.04743 -0.0976314 7.6806 0.292893 8.07112L6.65686 14.4351C7.04738 14.8256 7.68054 14.8256 8.07107 14.4351C8.46159 14.0446 8.46159 13.4114 8.07107 13.0209L2.41421 7.36402L8.07107 1.70716C8.46159 1.31664 8.46159 0.683472 8.07107 0.292947C7.68054 -0.097577 7.04738 -0.097577 6.65685 0.292947L0.292892 6.65691ZM25 7.36401L25 6.36401L1 6.36402L1 7.36402L1 8.36402L25 8.36401L25 7.36401Z"
					fill="currentColor"
				/>
			</svg>
			{children}
		</Link>
	);
}

export default ReturnNav;
