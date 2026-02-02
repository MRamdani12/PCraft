import { Link } from "react-router";

type ButtonProps = {
	children: React.ReactNode;
	type?: "primary" | "secondary";

	to?: string;
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button({
	children,
	type = "primary",

	to,
	className,
	onClick,
}: ButtonProps) {
	const baseStyles = `py-3 px-10 transition duration-200 ease cursor-pointer rounded-[3px]`;

	const styles = {
		primary: `${baseStyles} bg-black text-white border border-black hover:bg-white hover:text-black`,
		secondary: `${baseStyles} bg-white text-black border border-white hover:bg-black hover:text-white`,
	};

	if (to) {
		return (
			<Link to={to} className={`${styles[type]} block ${className}`}>
				{children}
			</Link>
		);
	}

	return (
		<button onClick={onClick} className={`${styles[type]} ${className}`}>
			{children}
		</button>
	);
}

export default Button;
