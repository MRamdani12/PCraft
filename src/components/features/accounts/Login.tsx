import { useState, type FormEvent } from "react";

import {
	useAppDispatch,
	useAppSelector,
} from "../../../utils/hooks/reduxHooks";
import { create } from "./AccountSlice";

import BackgroundLogo from "../../ui/backgrounds/BackgroundLogo";
import loginBg from "../../../assets/login-bg.png";
import Button from "../../ui/Button";
import BackgroundBar from "../../ui/backgrounds/BackgroundBar";
import ReturnNav from "../../ui/navigation/ReturnNav";

function Login() {
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");

	// Redux stuff
	const dispatch = useAppDispatch();
	const [accName, accEmail] = useAppSelector((state) => [
		state.account.userName,
		state.account.email,
	]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!email || !userName) return;

		const newAccount = {
			id: crypto.randomUUID(),
			userName,
			email,
			createdAt: new Date().toLocaleDateString(),
		};

		dispatch(create(newAccount));
		setUserName("");
		setEmail("");
	};

	return (
		<div className="relative min-h-dvh">
			<ReturnNav className="absolute top-5 left-5 z-100 flex items-center justify-between gap-2 text-white xl:top-20 xl:left-20 xl:text-black">
				Return Home
			</ReturnNav>
			<BackgroundBar className="none absolute -bottom-4 -left-10 -z-1 hidden overflow-hidden xl:block" />
			<div className="flex h-full flex-col-reverse items-center justify-center gap-5 xl:flex-row">
				<div className="xl: flex h-full flex-col justify-center px-5 py-5 xl:h-dvh xl:w-[50%] xl:px-20">
					<h1 className="pb-5 leading-15">
						Welcome! Enter your email and userName to continue
					</h1>
					<p className="pb-11 text-xl! font-light!">
						Your info that you submit here will be stored in your browser’s
						local storage and will be lost if you delete your cookies.
					</p>
					<form
						onSubmit={handleSubmit}
						className="flex w-full flex-col items-start justify-start gap-10"
					>
						<div className="flex w-full flex-col gap-3">
							{accName}
							{accEmail}
							<label className="text-xl font-light" htmlFor="userName">
								UserName
							</label>
							<input
								className="w-full border border-solid border-black p-2"
								placeholder="Enter your userName"
								id="userName"
								type="text"
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
							/>
						</div>
						<div className="flex w-full flex-col gap-3">
							<label className="text-xl font-light" htmlFor="email">
								Email
							</label>
							<input
								className="w-full border border-solid border-black p-2"
								placeholder="Enter your email"
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<Button>SUBMIT</Button>
					</form>
				</div>
				<div className="relative flex h-full w-full items-center justify-center xl:h-dvh xl:w-[50%]">
					<BackgroundLogo className="relative bottom-3 z-10 scale-50 transform-gpu text-white xl:bottom-10" />
					<img
						className="absolute inset-0 h-full w-full object-cover"
						src={loginBg}
						alt="Background"
					/>
				</div>
			</div>
		</div>
	);
}

export default Login;
