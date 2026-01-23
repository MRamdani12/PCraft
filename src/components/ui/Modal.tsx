import FadeInOut from "./animations/FadeInOut";

type ModalProps = {
	children: React.ReactNode;
	isOpen: boolean;
	closeModal: () => void;
};

function Modal({ children, isOpen, closeModal }: ModalProps) {
	return (
		<FadeInOut className="fixed" show={isOpen}>
			<div className="fixed inset-0 z-1000 flex items-center justify-center">
				<button
					onClick={closeModal}
					className="absolute top-10 right-10 z-50 cursor-pointer rounded-xs bg-red-500 px-4 py-2 text-white transition duration-200 hover:bg-white hover:text-red-500"
				>
					✖
				</button>
				<div
					className="absolute inset-0 bg-[rgba(0,0,0,0.9)]"
					onClick={closeModal}
				></div>
				{children}
			</div>
		</FadeInOut>
	);
}

export default Modal;
