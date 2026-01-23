function ViewButton({
	children,
	className,
	onClick,
}: {
	children: React.ReactNode;
	className?: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
	return (
		<button
			onClick={onClick}
			className={`flex h-full w-full cursor-pointer items-center justify-center p-3 transition-all duration-200 hover:bg-black hover:text-white ${className}`}
		>
			{children}
		</button>
	);
}

export default ViewButton;
