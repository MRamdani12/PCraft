import BackgroundFourIncline from "../../ui/backgrounds/BackgroundFourIncline";
import BackgroundFourInclineStroke from "../../ui/backgrounds/BackgroundFourInclineStroke";
import ButtonSkewed from "../../ui/ButtonSkewed";
import MessageBox from "../../ui/MessageBox";

type StoreCardProps = {
	img: string;
	id: number;
	itemName: string;
	itemPrice: number;
	itemDescription: string;
	itemStock: number;
};

function StoreCard({
	img,
	id,
	itemName,
	itemPrice,
	itemDescription,
	itemStock,
}: StoreCardProps) {
	return (
		<div className="relative flex max-h-75 w-full overflow-clip border border-[rgba(0,0,0,0.2)]">
			<div className="flex w-[25%] items-center justify-center border-r border-[rgba(0,0,0,0.2)]">
				<img className="h-full" src={img} alt={itemName} />
			</div>
			<div className="relative flex w-[75%] flex-col items-start justify-between overflow-clip p-5 pr-20">
				<BackgroundFourIncline className="absolute -right-10 -bottom-5 z-0" />
				<BackgroundFourInclineStroke className="absolute -top-5 -left-10 z-0 opacity-30" />
				<button className="absolute top-5 right-5 z-100 rounded-xs bg-black p-5">
					<svg
						className="mr-1 scale-125 transform-gpu text-white"
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
				<div>
					<h2 className="mb-2 line-clamp-2 text-4xl!">{itemName}</h2>
					<p>{itemDescription}</p>
				</div>

				<div className="flex w-full max-w-90 items-center justify-between gap-5">
					{itemStock ? (
						<>
							<ButtonSkewed
								className="w-full justify-start pl-5"
								to={`/store/${id}`}
							>
								SEE MORE DETAILS
							</ButtonSkewed>

							<p className="relative right-4 flex items-center justify-center rounded-xs p-4">
								<div className="absolute inset-0 scale-y-90 -skew-x-18 transform-gpu rounded-xs border border-black transition-all duration-200"></div>
								${itemPrice}
							</p>
						</>
					) : (
						<MessageBox className="h-full bg-white py-3.5">SOLD OUT</MessageBox>
					)}
				</div>
			</div>
		</div>
	);
}

export default StoreCard;
