function Loading({ alternate }: { alternate?: boolean }) {
	return (
		<>
			<div className="load-container">
				<div
					style={{ backgroundColor: alternate ? "white" : "black" }}
					className="load-period"
				></div>
				<div
					style={{ backgroundColor: alternate ? "white" : "black" }}
					className="load-period"
				></div>
				<div
					style={{ backgroundColor: alternate ? "white" : "black" }}
					className="load-period"
				></div>
				<div
					style={{ backgroundColor: alternate ? "white" : "black" }}
					className="load-period"
				></div>
			</div>
		</>
	);
}

export default Loading;
