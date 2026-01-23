function Container({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={`mx-auto h-full max-w-400 px-4 ${className}`}>
			{children}
		</div>
	);
}

export default Container;
