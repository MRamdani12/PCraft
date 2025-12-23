// import { useEffect, useRef, useState } from "react";

// import BackgroundFourIncline from "./backgrounds/BackgroundFourIncline";
// import BackgroundFourInclineStroke from "./backgrounds/BackgroundFourInclineStroke";

// const CLONES = 4;
// const ITEM_WIDTH = 440;
// const TRANSITION_DURATION = 300;

// function Slider() {
// 	const [index, setIndex] = useState(-4);
// 	const [transitionIndex, setTransitionIndex] = useState(-4);

// 	const [jumping, setJumping] = useState(false);
// 	const needsResetDir = useRef<"left" | "right" | null>(null);

// 	const slides = Array.from({ length: 9 }, (_, i) => i);
// 	const extendedSlides = [
// 		...slides.slice(-CLONES),
// 		...slides,
// 		...slides.slice(0, CLONES),
// 	];
// 	const translateX = -index * ITEM_WIDTH;

// 	function handleMoveRight() {
// 		setIndex((i) => i + 1);
// 	}

// 	function handleMoveLeft() {
// 		setIndex((i) => i - 1);
// 	}

// 	useEffect(() => {
// 		// let rightTimeout: number;
// 		// let leftTimeout: number;

// 		if (index > 5) {
// 			// eslint-disable-next-line react-hooks/set-state-in-effect
// 			setJumping(true);
// 			setIndex(-4);
// 		}

// 		if (index === 5) {
// 			needsResetDir.current = "right";
// 		}

// 		if (index < -5) {
// 			setJumping(true);
// 			setIndex(4);
// 		}

// 		if (index === -5) {
// 			needsResetDir.current = "left";
// 		}

// 		console.log(index);
// 	}, [index, slides.length]);

// 	useEffect(() => {
// 		if (!jumping) return;

// 		const nextFrame = requestAnimationFrame(() => setJumping(false));

// 		return () => {
// 			cancelAnimationFrame(nextFrame);
// 		};
// 	}, [jumping]);

// 	return (
// 		<>
// 			<section className="relative flex items-center justify-start overflow-hidden py-60">
// 				<div className="absolute top-0 bottom-0 left-0 z-20 w-100 bg-linear-to-r from-[rgba(255,255,255,0.9)] to-[rgba(255,255,255,0)]"></div>
// 				<div className="absolute top-0 right-0 bottom-0 z-20 w-100 bg-linear-to-l from-[rgba(255,255,255,0.9)] to-[rgba(255,255,255,0)]"></div>
// 				<div className="absolute top-30 z-30 flex w-full items-center justify-between gap-5 px-20">
// 					<h2 className="text-[32px]! font-black!">OUR PRODUCTS</h2>
// 					<div className="flex items-center justify-between gap-5">
// 						<button
// 							className="ease cursor-pointer p-5 transition-transform duration-300 hover:-translate-x-2"
// 							onClick={handleMoveRight}
// 						>
// 							<svg
// 								width="39"
// 								height="15"
// 								viewBox="0 0 39 15"
// 								fill="none"
// 								xmlns="http://www.w3.org/2000/svg"
// 							>
// 								<path
// 									d="M0.292892 6.65691C-0.0976295 7.04743 -0.0976295 7.6806 0.292892 8.07112L6.65685 14.4351C7.04738 14.8256 7.68054 14.8256 8.07107 14.4351C8.46159 14.0446 8.46159 13.4114 8.07107 13.0209L2.41422 7.36401L8.07107 1.70716C8.46159 1.31664 8.46159 0.68347 8.07107 0.292946C7.68054 -0.0975785 7.04738 -0.0975785 6.65685 0.292946L0.292892 6.65691ZM39 7.36401V6.36401L1 6.36401V7.36401V8.36401L39 8.36401V7.36401Z"
// 									fill="black"
// 								/>
// 							</svg>
// 						</button>
// 						<button
// 							className="ease cursor-pointer p-5 transition-transform duration-300 hover:translate-x-2"
// 							onClick={handleMoveLeft}
// 						>
// 							<svg
// 								width="37"
// 								height="15"
// 								viewBox="0 0 37 15"
// 								fill="none"
// 								xmlns="http://www.w3.org/2000/svg"
// 							>
// 								<path
// 									d="M36.7071 8.07112C37.0976 7.6806 37.0976 7.04743 36.7071 6.65691L30.3431 0.292946C29.9526 -0.0975785 29.3195 -0.0975785 28.9289 0.292946C28.5384 0.68347 28.5384 1.31664 28.9289 1.70716L34.5858 7.36401L28.9289 13.0209C28.5384 13.4114 28.5384 14.0446 28.9289 14.4351C29.3195 14.8256 29.9526 14.8256 30.3431 14.4351L36.7071 8.07112ZM0 7.36401L0 8.36401L36 8.36401V7.36401V6.36401L0 6.36401L0 7.36401Z"
// 									fill="black"
// 								/>
// 							</svg>
// 						</button>
// 					</div>
// 				</div>
// 				<BackgroundFourIncline className="absolute bottom-45 -left-20 -z-1" />
// 				<BackgroundFourInclineStroke className="absolute top-45 -right-20 -z-1 rotate-x-180 transform-gpu" />

// 				<div
// 					onTransitionEnd={() => {
// 						if (needsResetDir.current === "right" && index === 5) {
// 							handleMoveRight();
// 						}

// 						if (needsResetDir.current === "left" && index === -5) {
// 							handleMoveLeft();
// 						}
// 						setTransitionIndex(index);

// 						needsResetDir.current = null;
// 					}}
// 					style={{
// 						transform: `translateX(${translateX}px)`,
// 						transitionDuration: jumping ? "0ms" : `${TRANSITION_DURATION}ms`,
// 					}}
// 					className="duration ease relative z-10 flex w-full transform-gpu items-center justify-center gap-10 transition-all"
// 				>
// 					{extendedSlides.map((itemIndex, i) => {
// 						return (
// 							<SliderCard
// 								key={i}
// 								isMiddle={transitionIndex + 4 === itemIndex}
// 								itemName="GeForce RTX™ 5080 16G GAMING TRIO OC"
// 								itemDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a suscipit magna. Integer eget elementum est..."
// 								itemPrice={499}
// 								img="https://res.cloudinary.com/dx6inztlb/image/upload/v1765188301/MSI-RTX-5080_j5m8ut.png"
// 							/>
// 						);
// 					})}
// 				</div>
// 			</section>
// 		</>
// 	);
// }

// export default Slider;
