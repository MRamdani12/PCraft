function MessageBox({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`flex w-full items-center justify-center rounded-xs border border-[rgba(0,0,0,0.3)] ${className}`}
		>
			{children}
		</div>
	);
}

export default MessageBox;
