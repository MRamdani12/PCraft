import { useEffect } from "react";

type FloatingErrorType = {
	error: string;
	deleteErrorFn: () => void;
};

function FloatingError({ error, deleteErrorFn }: FloatingErrorType) {
	useEffect(() => {
		const timeout = setTimeout(() => {
			deleteErrorFn();
		}, 5000);
		return () => {
			clearTimeout(timeout);
		};
	}, [deleteErrorFn]);

	return (
		<div className="fixed bottom-10 left-10 z-100 w-auto! items-center justify-center gap-2 rounded-xs border-0 bg-red-500 px-5 py-3 text-white">
			{error}
			<button onClick={deleteErrorFn} className="mt-1 cursor-pointer p-2">
				✖
			</button>
		</div>
	);
}

export default FloatingError;
