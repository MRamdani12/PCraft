function Container({ children }: { children: React.ReactNode }) {
	return <div className="mx-auto h-full max-w-360 px-4">{children}</div>;
}

export default Container;
