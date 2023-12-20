"use client";

import { Link } from "@chakra-ui/next-js";

import {
	Button,
	Text,
	FormControl,
	Heading,
	Input,
	Stack,
	Image,
	Divider,
	InputGroup,
	Circle,
	InputRightElement,
	Box,
	AbsoluteCenter,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Swal from "sweetalert2";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const router = useRouter();

	useEffect(() => {
		router.refresh()
		if (isLoggedIn) {
			router.push('/dashboard')
		}
	})

	const handleCredentialLogin = (event) => {
		event.preventDefault()
		signIn("credentials", { email, password, redirect: false })
			.then(({ ok, error }) => {
				if (ok) {
					setIsLoggedIn(true)
				} else {
					let errorMessage = "";
					switch (error) {
						case "CredentialsSignin":
							errorMessage = "Invalid Credentials";
							break;
						case "UNVERIFIED_USER":
							errorMessage = 'Account still unverified'
							break;
						default:
							errorMessage = error;
							break;
					}

					Swal.fire({
						title: "Error!",
						text: errorMessage,
						icon: "error",
						confirmButtonText: "Ok",
					});
				}
			})
			.catch((error) => {
				Swal.fire({
					title: "Server Error",
					text: error.message,
					icon: "error",
					confirmButtonText: "Ok",
				});
			});
	};

	return (
		<Stack direction={{ base: "column", md: "row" }} gap={0}>
			<Box w={["full", "full", "50vw"]}>
				<Image
					alt={"Login Image"}
					objectFit={"cover"}
					width={"full"}
					height={"100vh"}
					filter={"auto"}
					blur={"1px"}
					opacity={"0.6"}
					src={
						"https://images.unsplash.com/photo-1607424064879-708250e57647?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					}
				/>
			</Box>
			<Box w={["full", "full", "50vw"]}>
				<Stack as={'form'}
					spacing={6}
					align={"center"}
					my={{ base: 6, "2xl": 8 }}
					mx={"auto"}
					h={["auto"]}
					p={[4, 2, 8]}
					w={{ base: "md", md: "auto", xl: "xl" }}
					boxShadow={{ xl: "lg" }}
					rounded={{ xl: "xl" }}
				>
					<Circle size="64px" bg="#8B819A" color="white">
						<Text fontSize={"2.5rem"}>BY</Text>
					</Circle>
					<Heading fontSize={"2rem"} align={"center"}>
						Welcome to BusYan
					</Heading>
					<Text fontSize={"1.5rem"} align={"center"}>
						Enter your account
					</Text>

					<FormControl id="email" mt={"2.5rem"} isRequired>
						<Input
							size="lg"
							type="email"
							borderRadius="10"
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>
					<FormControl id="password" isRequired textalign={"right"}>
						<InputGroup>
							<Input
								onChange={(e) => setPassword(e.target.value)}
								size="lg"
								type={showPassword ? "text" : "password"}
								borderRadius="10"
								placeholder="Password"
							/>
							<InputRightElement h={"full"}>
								<Button
									variant={""}
									onClick={() =>
										setShowPassword((showPassword) => !showPassword)
									}
								>
									{showPassword ? <ViewIcon /> : <ViewOffIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>
						<Link
							textAlign={"right"}
							fontSize={"medium"}
							href="/reset-password"
						>
							Forgot Password?
						</Link>
					</FormControl>

					<Stack
						direction={{ base: "column" }}
						align={"stretch"}
						textAlign={"center"}
						w={"full"}
						justify={"center"}
					>
						<Button
							variant={"solid"}
							className={"bg-default-button"}
							color={"white"}
							size={"lg"}
							borderRadius="10"
							marginTop={"2rem"}
							type="submit"
							onClick={handleCredentialLogin}
						>
							Login
						</Button>
						<Text>
							Dont have an account?{" "}
							<Link color={"#00B11C"} href="/register">
								Sign Up
							</Link>
						</Text>
						<Box position="relative" py="5">
							<Divider className="border-black" />
							<AbsoluteCenter bg="white" px={3}>
								<Text>or</Text>
							</AbsoluteCenter>
						</Box>
						<Button
							variant={"outline"}
							size={"lg"}
							borderRadius="10"
							onClick={() =>
								signIn("google", { redirect: true, callbackUrl: "/dashboard" })
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								width="23"
								height="23"
								viewBox="0 0 48 48"
							>
								<path
									fill="#FFC107"
									d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
								></path>
								<path
									fill="#FF3D00"
									d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
								></path>
								<path
									fill="#4CAF50"
									d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
								></path>
								<path
									fill="#1976D2"
									d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
								></path>
							</svg>{" "}
							Sign in with Google
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Stack>
	);
};

export default Login;
