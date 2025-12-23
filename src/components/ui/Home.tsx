import BackgroundBar from "./backgrounds/BackgroundBar";
import BackgroundBarStroke from "./backgrounds/BackgroundBarStroke";
import BackgroundLogo from "./backgrounds/BackgroundLogo";
import Button from "./Button";
import Container from "./Container";
import aboutImg from "../../assets/pexels-joshsorenson-1714208 1.png";
// import Slider from "./Slider";
import Navigation from "./navigation/Navigation";

function Home() {
	return (
		<>
			<Navigation />
			<header className="relative h-dvh overflow-hidden text-center">
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
						<BackgroundBarStroke className="absolute -top-30 -right-260 -z-1 -rotate-z-90 transform-gpu opacity-0" />
					</div>
				</Container>
			</header>
			<section className="relative overflow-hidden py-15 lg:h-[80vh]">
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
								<Button type="secondary">VISIT STORE</Button>
							</div>
							<div className="lg:w-[50%]">
								<img src={aboutImg} alt="gaming-rig" />
							</div>
						</div>
					</Container>
				</div>
			</section>
			{/* <Slider /> */}
			<section className="relative flex h-[70vh] items-center justify-center overflow-hidden text-center">
				<Container>
					<div className="flex h-full flex-col items-center justify-center pb-50">
						<h2 className="mb-5 leading-14">WHAT’RE YOU WAITING FOR?</h2>
						<Button>VISIT STORE</Button>
					</div>
				</Container>
				<BackgroundBar className="absolute right-0 -bottom-5 rotate-y-180 transform-gpu" />
			</section>
		</>
	);
}

export default Home;
