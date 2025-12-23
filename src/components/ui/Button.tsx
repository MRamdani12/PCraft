import { Link } from "react-router";

type ButtonProps = {
	children: React.ReactNode;
	type?: "primary" | "secondary";
	additionalClass?: string;
	to?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button({
	children,
	type = "primary",
	additionalClass,
	to,
	onClick,
}: ButtonProps) {
	const baseStyles = `py-3 px-10 transition duration-200 ease cursor-pointer rounded-[3px] ${
		additionalClass ?? ""
	}`;

	const styles = {
		primary: `${baseStyles} bg-black text-white border border-black hover:bg-white hover:text-black`,
		secondary: `${baseStyles} bg-white text-black border border-white hover:bg-black hover:text-white`,
	};

	if (to) {
		return (
			<Link to={to} className={styles[type]}>
				{children}
			</Link>
		);
	}

	return (
		<button onClick={onClick} className={styles[type]}>
			{children}
		</button>
	);
}

export default Button;
