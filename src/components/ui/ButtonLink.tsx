import { Link } from "react-router";

type ButtonLinkType = {
	children: React.ReactNode;
	to: string;
};

function ButtonLink({ children, to }: ButtonLinkType) {
	return (
		<Link className="underline" to={to}>
			{children}
		</Link>
	);
}

export default ButtonLink;
