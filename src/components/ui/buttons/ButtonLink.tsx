import { Link } from "react-router";

type ButtonLinkType = {
	children: React.ReactNode;
	to?: string;
	onClick?: () => void;
};

function ButtonLink({ children, to, onClick }: ButtonLinkType) {
	if (to)
		return (
			<Link className="cursor-pointer underline" to={to}>
				{children}
			</Link>
		);

	return (
		<button onClick={onClick} className="cursor-pointer underline">
			{children}
		</button>
	);
}

export default ButtonLink;
