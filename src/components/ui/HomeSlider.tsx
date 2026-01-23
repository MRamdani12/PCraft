import { useState } from "react";
import BackgroundFourIncline from "./backgrounds/BackgroundFourIncline";
import BackgroundFourInclineStroke from "./backgrounds/BackgroundFourInclineStroke";

// 40 is for padding
const ITEM_WIDTH = 440;

function HomeSlider({
	children,
	disabled,
}: {
	children: React.ReactNode;
	disabled?: boolean;
}) {
	const [index, setIndex] = useState(0);
	const translateX = -index * ITEM_WIDTH;

	function handleMoveRight() {
		setIndex((i) => i + 1);
	}

	function handleMoveLeft() {
		setIndex((i) => i - 1);
	}

	return (
		<>
			<section className="relative flex items-center justify-start overflow-clip py-60">
				<div className="absolute top-0 bottom-0 left-0 z-20 w-100 bg-linear-to-r from-[rgba(255,255,255,1)] to-[rgba(255,255,255,0)] opacity-0 xl:opacity-100"></div>
				<div className="absolute top-0 right-0 bottom-0 z-20 w-100 bg-linear-to-l from-[rgba(255,255,255,1)] to-[rgba(255,255,255,0)] opacity-0 xl:opacity-100"></div>
				<div className="absolute top-30 z-30 flex w-full flex-wrap items-center justify-between gap-5 px-10">
					<h2 className="text-[32px]! font-black!">OUR PRODUCTS</h2>
					{!disabled && (
						<div className="flex items-center justify-between gap-5">
							<button
								onClick={handleMoveRight}
								className="ease cursor-pointer p-5 transition-transform duration-300 hover:-translate-x-2"
								style={
									index >= 5
										? { opacity: "0", cursor: "default" }
										: { opacity: "1", cursor: "pointer" }
								}
								disabled={index >= 5}
							>
								<svg
									width="39"
									height="15"
									viewBox="0 0 39 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M0.292892 6.65691C-0.0976295 7.04743 -0.0976295 7.6806 0.292892 8.07112L6.65685 14.4351C7.04738 14.8256 7.68054 14.8256 8.07107 14.4351C8.46159 14.0446 8.46159 13.4114 8.07107 13.0209L2.41422 7.36401L8.07107 1.70716C8.46159 1.31664 8.46159 0.68347 8.07107 0.292946C7.68054 -0.0975785 7.04738 -0.0975785 6.65685 0.292946L0.292892 6.65691ZM39 7.36401V6.36401L1 6.36401V7.36401V8.36401L39 8.36401V7.36401Z"
										fill="black"
									/>
								</svg>
							</button>
							<button
								onClick={handleMoveLeft}
								className="ease cursor-pointer p-5 transition-transform duration-300 hover:translate-x-2"
								style={
									index <= -5
										? { opacity: "0", cursor: "default" }
										: { opacity: "1", cursor: "pointer" }
								}
								disabled={index <= -5}
							>
								<svg
									width="37"
									height="15"
									viewBox="0 0 37 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M36.7071 8.07112C37.0976 7.6806 37.0976 7.04743 36.7071 6.65691L30.3431 0.292946C29.9526 -0.0975785 29.3195 -0.0975785 28.9289 0.292946C28.5384 0.68347 28.5384 1.31664 28.9289 1.70716L34.5858 7.36401L28.9289 13.0209C28.5384 13.4114 28.5384 14.0446 28.9289 14.4351C29.3195 14.8256 29.9526 14.8256 30.3431 14.4351L36.7071 8.07112ZM0 7.36401L0 8.36401L36 8.36401V7.36401V6.36401L0 6.36401L0 7.36401Z"
										fill="black"
									/>
								</svg>
							</button>
						</div>
					)}
				</div>
				<BackgroundFourIncline className="absolute bottom-45 -left-20 -z-1" />
				<BackgroundFourInclineStroke className="absolute top-55 -right-20 -z-1 rotate-x-180 transform-gpu opacity-0 xl:opacity-100" />

				<div
					style={{ transform: `translateX(${translateX}px)` }}
					className="ease relative mt-5 flex w-full transform-gpu items-stretch justify-center gap-10 transition-all duration-300"
				>
					{children}
				</div>
			</section>
		</>
	);
}

export default HomeSlider;
