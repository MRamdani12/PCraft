import Button from "../buttons/Button";
import Container from "../Container";
import Logo from "../Logo";
import { useAppSelector } from "../../../utils/hooks/reduxHooks";
import ButtonLink from "../buttons/ButtonLink";

function Navigation() {
	const userName = useAppSelector((state) => state.account.userName);
	const accountId = useAppSelector((state) => state.account.id);

	return (
		<nav className="absolute top-0 z-100 w-full">
			<Container>
				<div className="flex w-full flex-wrap items-center justify-center gap-5 py-5 sm:justify-between">
					<Logo />
					{userName ? (
						<div className="flex gap-2">
							<p>Hi, {userName}</p> |{" "}
							<ButtonLink to={`/order-history/${accountId}`}>
								Check order history
							</ButtonLink>
						</div>
					) : (
						<Button to="/login">LOGIN</Button>
					)}
				</div>
			</Container>
		</nav>
	);
}

export default Navigation;
