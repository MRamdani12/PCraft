function MessageBox({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`flex w-full items-center justify-center rounded-xs border border-black ${className}`}
		>
			{children}
		</div>
	);
}

export default MessageBox;
