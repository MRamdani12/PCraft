import Button from "../Button";
import Container from "../Container";
import Logo from "../Logo";
import { useAppSelector } from "../../../utils/hooks/reduxHooks";
import ButtonLink from "../ButtonLink";

function Navigation() {
	const userName = useAppSelector((state) => state.account.userName);

	return (
		<nav className="absolute top-0 z-100 w-full">
			<Container>
				<div className="flex w-full items-center justify-between py-5">
					<Logo />
					{userName ? (
						<div className="flex gap-2">
							<p>Hi, {userName}</p> |{" "}
							<ButtonLink to="/">Check order history</ButtonLink>
						</div>
					) : (
						<Button to="login">LOGIN</Button>
					)}
				</div>
			</Container>
		</nav>
	);
}

export default Navigation;
