import { Link } from "react-router";
import { useAppSelector } from "../../../../utils/hooks/reduxHooks";

function GlobalCartButton() {
	const accountState = useAppSelector((state) => state.account);
	const totalCartItem = accountState.cart.reduce(
		(acc, item) => acc + item.itemQuantity,
		0,
	);

	return (
		<>
			{accountState.id && (
				<Link
					to={"/cart"}
					className="fixed right-10 bottom-10 z-100 cursor-pointer rounded-sm border border-black bg-black p-5 text-white transition-all duration-250 hover:bg-white hover:text-black"
				>
					<div className="relative">
						{totalCartItem > 0 && (
							<div className="absolute -top-3 -right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white">
								{totalCartItem}
							</div>
						)}

						<svg
							width="33"
							height="33"
							viewBox="0 0 33 33"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="relative"
						>
							<path
								d="M6.68294 4.44444H29.3485C30.6773 4.44444 31.6366 5.71625 31.2716 6.99389L28.97 15.0494C28.7247 15.908 27.9399 16.5 27.047 16.5H8.53767M30.2778 23.3889H11.3269C10.3398 23.3889 9.50031 22.6687 9.35021 21.693L6.42757 2.69589C6.27747 1.72022 5.43797 1 4.45083 1H1M11.3333 30.2778C11.3333 31.229 10.5623 32 9.61111 32C8.65996 32 7.88889 31.229 7.88889 30.2778C7.88889 29.3266 8.65996 28.5556 9.61111 28.5556C10.5623 28.5556 11.3333 29.3266 11.3333 30.2778ZM30.2778 30.2778C30.2778 31.229 29.5067 32 28.5556 32C27.6044 32 26.8333 31.229 26.8333 30.2778C26.8333 29.3266 27.6044 28.5556 28.5556 28.5556C29.5067 28.5556 30.2778 29.3266 30.2778 30.2778Z"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</Link>
			)}
		</>
	);
}

export default GlobalCartButton;
