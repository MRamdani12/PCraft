import BackgroundFourIncline from "../../ui/backgrounds/BackgroundFourIncline";
import Button from "../../ui/Button";

type StoreCardProps = {
	img: string;
	itemName: string;
	itemPrice: number;
	itemDescription: string;
};

function StoreCard({
	img,
	itemName,
	itemPrice,
	itemDescription,
}: StoreCardProps) {
	return (
		<div className="w-full max-w-100 shrink-0 overflow-hidden rounded-xs border border-[rgba(0,0,0,0.2)]">
			<div className="relative w-full border-b border-[rgba(0,0,0,0.2)]">
				<span className="absolute top-4 right-4 flex items-center justify-center rounded-xs bg-black px-10 py-2 text-white">
					${itemPrice}
				</span>
				<img className="w-full" src={img} alt={itemName} />
			</div>
			<div className="relative p-4">
				<h3 className="text-2xl">{itemName}</h3>
				<p className="mb-10">{itemDescription}</p>
				<Button>See more details</Button>
				<BackgroundFourIncline className="absolute bottom-0 -left-30 -z-1 rotate-y-180 transform-gpu opacity-10" />
			</div>
		</div>
	);
}

export default StoreCard;
