import { useEffect, useState } from "react";
import type { StoreItemResponseType } from "../../features/store/utils/types/StoreItemsResponseType";

import type { StoreItemType } from "../../features/store/utils/types/StoreItemsType";
import { getStoreItems } from "../../../utils/services/apiServices";

import BackgroundBar from "../backgrounds/BackgroundBar";
import BackgroundBarStroke from "../backgrounds/BackgroundBarStroke";
import BackgroundLogo from "../backgrounds/BackgroundLogo";
import Button from "../buttons/Button";
import Container from "../Container";
import aboutImg from "../../../assets/pexels-joshsorenson-1714208 1.png";
import Navigation from "../navigation/Navigation";
import StoreCard from "../../features/store/StoreCard";
import HomeSlider from "./HomeSlider";

import GlobalCartButton from "../../features/accounts/cart/GlobalCartButton";
import StoreCardLoading from "../../features/store/StoreCardLoading";

function Home() {
	const [storeItems, setStoreItems] = useState<StoreItemType[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const SLIDER_ITEM_LIMIT = 11;

	useEffect(() => {
		async function fetchStoreItems() {
			setIsLoading(true);
			try {
				const data: StoreItemResponseType =
					await getStoreItems(SLIDER_ITEM_LIMIT);

				setStoreItems(data.items);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoading(false);
			}
		}
		fetchStoreItems();
	}, []);

	return (
		<>
			<Navigation />
			<GlobalCartButton />
			<header className="relative h-dvh overflow-clip text-center">
				<Container>
					<div className="flex h-full flex-col items-center justify-center">
						<h1 className="mb-7">HONEST HARDWARE FOR EVERY BUILDER</h1>
						<p className="mx-auto mb-13 max-w-184">
							PCraft is your go to source for computer components priced just a
							bit above MSRP, no scalping, no surprises. We’re committed to
							providing real builders with real access to the parts they need,
							at honest margins that keep the community running strong.
						</p>
						<Button to="store">VISIT STORE</Button>
						<BackgroundLogo className="absolute bottom-80 -left-110 -z-1 -rotate-z-90 transform-gpu opacity-5" />
						<BackgroundBarStroke className="absolute -top-30 -right-260 -z-1 -rotate-z-90 transform-gpu opacity-0 xl:opacity-20" />
					</div>
				</Container>
			</header>
			<section className="relative overflow-clip py-15 lg:h-[80vh]">
				<BackgroundBar className="absolute top-0 -left-350 rotate-x-180 rotate-z-180 transform-gpu" />
				<BackgroundBar className="absolute -right-350 bottom-0 rotate-y-180 rotate-z-180 transform-gpu" />
				<div className="h-full bg-black py-10 text-white">
					<span className="absolute top-5 left-4 z-10 text-3xl font-bold lg:left-30">
						ABOUT US
					</span>
					<span className="absolute -top-9 -left-30 text-9xl font-bold text-nowrap opacity-7 lg:-top-2 lg:-left-10">
						ABOUT US
					</span>
					<Container>
						<div className="flex h-full flex-col-reverse items-center justify-center gap-30 lg:flex-row">
							<div className="mb-15 lg:w-[50%]">
								<h2 className="mb-2">BUILT FOR BUILDERS</h2>
								<p className="mb-10">
									At PCraft, we believe in honest access to the gear that powers
									your passion. We offer computer components priced just above
									MSRP, no scalping, no gimmicks. Our mission is simple: support
									real builders with the parts they need, at margins that keep
									the community thriving. Whether you're upgrading your rig or
									starting fresh, we're here to help you build your dream rig.
								</p>
								<Button to="/store" type="secondary" className="inline!">
									VISIT STORE
								</Button>
							</div>
							<div className="relative text-white lg:w-[50%]">
								<div className="gaming-rig relative z-100">
									<img src={aboutImg} alt="h-full" />
								</div>
								<div className="absolute -bottom-50 left-0 z-0 hidden xl:block">
									<svg
										width="75"
										height="250"
										viewBox="0 0 75 250"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M74.5 148.793L0.499991 74.793L0.499991 1.20703L74.5 75.207L74.5 148.793Z"
											stroke="currentColor"
										/>
										<path
											d="M74.5 248.793L0.499991 174.793L0.499991 101.207L74.5 175.207L74.5 248.793Z"
											stroke="currentColor"
										/>
									</svg>
								</div>
								<div className="absolute -top-50 right-25 z-0">
									<svg
										width="75"
										height="856"
										viewBox="0 0 75 856"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M75 75L75 150L-2.98023e-06 75L-2.98023e-06 0L75 75Z"
											fill="currentColor"
											fillOpacity="0.1"
										/>
										<path
											d="M75 175L75 250L-2.98023e-06 175L-2.98023e-06 100L75 175Z"
											fill="currentColor"
											fillOpacity="0.1"
										/>
										<path
											d="M75 478L75 553L-2.98023e-06 478L-2.98023e-06 403L75 478Z"
											fill="currentColor"
											fillOpacity="0.1"
										/>
										<path
											d="M75 578L75 653L-2.98023e-06 578L-2.98023e-06 503L75 578Z"
											fill="currentColor"
											fillOpacity="0.1"
										/>
										<path
											d="M74.5 351.793L0.499991 277.793L0.499991 204.207L74.5 278.207L74.5 351.793Z"
											stroke="currentColor"
											stroke-opacity="0.15"
										/>
										<path
											d="M74.5 451.793L0.499991 377.793L0.499991 304.207L74.5 378.207L74.5 451.793Z"
											stroke="currentColor"
											stroke-opacity="0.15"
										/>
										<path
											d="M74.5 754.793L0.499991 680.793L0.499991 607.207L74.5 681.207L74.5 754.793Z"
											stroke="currentColor"
											stroke-opacity="0.15"
										/>
										<path
											d="M74.5 854.793L0.499991 780.793L0.499991 707.207L74.5 781.207L74.5 854.793Z"
											stroke="currentColor"
											stroke-opacity="0.15"
										/>
									</svg>
								</div>
							</div>
						</div>
					</Container>
				</div>
			</section>

			<HomeSlider>
				{isLoading &&
					Array.from({ length: SLIDER_ITEM_LIMIT }, (_, i) => (
						<StoreCardLoading key={i} />
					))}
				{storeItems.map((i) => {
					return (
						<StoreCard
							key={i.id}
							id={i.id}
							itemName={i.name}
							itemDescription={i.description.intro}
							itemPrice={i.price}
							img={i.gallery[0].url}
							itemStock={i.stock}
						/>
					);
				})}
				{/* {storeState.status === "error" && (
					<MessageBox className="mx-auto max-w-[80%] bg-white py-20">
						{storeState.error}
					</MessageBox>
				)} */}
			</HomeSlider>

			<section className="relative flex h-[70vh] items-center justify-center overflow-clip text-center">
				<Container>
					<div className="flex h-full flex-col items-center justify-center pb-50">
						<h2 className="mb-5 leading-14">WHAT’RE YOU WAITING FOR?</h2>
						<Button to="/store">VISIT STORE</Button>
					</div>
				</Container>
				<BackgroundBar className="absolute right-0 -bottom-5 rotate-y-180 transform-gpu" />
			</section>
		</>
	);
}

export default Home;
