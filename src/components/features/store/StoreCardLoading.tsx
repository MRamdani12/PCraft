function StoreCardLoading() {
	return (
		<div className="store-card-loading relative w-full shrink-0 overflow-clip rounded-xs border border-[rgba(0,0,0,0.1)] bg-white xl:max-w-100">
			<div className="relative w-full">
				<span className="absolute top-4 right-4 flex items-center justify-center rounded-xs bg-[#bbb] px-10 py-2 text-[#bbb]">
					$300
				</span>
				<div className="h-75 border-b border-[rgba(0,0,0,0.1)]"></div>
			</div>
			<div className="relative bg-[ccc] p-4">
				<div className="relative z-10">
					<div className="mb-3 h-10 w-full rounded-xs bg-[#bbb]"></div>

					<div className="flex flex-wrap items-center justify-between gap-3">
						<button className="ease relative w-[65%] min-w-47.5 shrink-0 transform-gpu cursor-pointer rounded-xs bg-[#bbb] p-4 text-start text-[#bbb] transition-all duration-300 hover:-translate-y-1 hover:opacity-80">
							<svg
								className="absolute top-0 -right-9 h-full scale-102 transform-gpu"
								height="120%"
								viewBox="0 0 33 39"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M0 1.48933C0 0.943285 0.438025 0.498197 0.984003 0.489462L31.5768 8.03428e-06C32.3862 -0.0129426 32.8748 0.891136 32.4204 1.56116L7.66327 38.0665C7.47718 38.3409 7.16719 38.5052 6.83564 38.5052H1C0.447715 38.5052 0 38.0575 0 37.5052V1.48933Z"
									fill="currentColor"
								/>
							</svg>
							SEE MORE DETAILS
						</button>
						<button className="relative right-4 flex w-[20%] cursor-pointer items-center justify-center rounded-xs p-4 transition-all duration-300 hover:-translate-y-1 hover:opacity-80">
							<div className="absolute inset-0 scale-y-110 -skew-x-36 transform-gpu rounded-xs border border-[#bbb] bg-[#bbb] text-[#bbb]"></div>
							<svg
								className="mr-1 scale-125 transform-gpu text-[#bbb]"
								width="17"
								height="17"
								viewBox="0 0 17 17"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M16.5 2.27778L14.9294 7.77472C14.8068 8.20402 14.4144 8.5 13.9679 8.5H4.39041M15.6111 12.0556H5.80236C5.30879 12.0556 4.88904 11.6954 4.81399 11.2076L3.29712 1.34794C3.22207 0.860111 2.80232 0.5 2.30875 0.5H0.5M8.05556 4.05556L9.83333 5.83333M9.83333 5.83333L11.6111 4.05556M9.83333 5.83333V0.5M5.83333 15.6111C5.83333 16.102 5.43536 16.5 4.94444 16.5C4.45353 16.5 4.05556 16.102 4.05556 15.6111C4.05556 15.1202 4.45353 14.7222 4.94444 14.7222C5.43536 14.7222 5.83333 15.1202 5.83333 15.6111ZM15.6111 15.6111C15.6111 16.102 15.2132 16.5 14.7222 16.5C14.2313 16.5 13.8333 16.102 13.8333 15.6111C13.8333 15.1202 14.2313 14.7222 14.7222 14.7222C15.2132 14.7222 15.6111 15.1202 15.6111 15.6111Z"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default StoreCardLoading;
