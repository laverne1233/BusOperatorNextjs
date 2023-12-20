"use client";

import { Link } from "@chakra-ui/next-js";

import {
	Button,
	Checkbox,
	Text,
	FormControl,
	Heading,
	Input,
	Stack,
	Image,
	InputGroup,
	InputRightElement,
	Circle,
	Box,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { registerUser } from "./action";

import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const Register = () => {
	const [phoneInput, setPhoneInput] = useState();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	return (
		<form action={registerUser}>
			<Stack direction={{ base: "column", md: "row" }} gap={0}>
				<Box w={{ md: "full", xl: "50vw" }}>
					<Image
						alt={"Register Image"}
						objectFit={"cover"}
						width={"full"}
						height={"100vh"}
						filter={"auto"}
						blur={"1px"}
						opacity={"0.6"}
						src={
							"https://images.unsplash.com/photo-1597920467799-ec8bee99f6eb?q=80&w=2140&auto=format&fit=crop&ixlib=rb-4.0.3"
						}
					/>
				</Box>
				<Box w={{ md: "full", xl: "50vw" }}>
					<Stack
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
							Create your account
						</Text>

						<FormControl id="company-name" mt={"2.5rem"} isRequired>
							<Input
								size="lg"
								type="text"
								borderRadius="10"
								placeholder="Company Name"
								name="company_name"
							/>
						</FormControl>
						<FormControl id="company-address" isRequired>
							<Input
								size="lg"
								type="text"
								borderRadius="10"
								placeholder="Company Address"
								name="company_address"
							/>
						</FormControl>
						<FormControl id="full-name" isRequired>
							<Input
								size="lg"
								type="text"
								borderRadius="10"
								placeholder="Full name"
								name="full_name"
							/>
						</FormControl>
						<FormControl id="email" isRequired>
							<Input
								size="lg"
								type="email"
								borderRadius="10"
								placeholder="Email"
								name="email"
							/>
						</FormControl>
						<FormControl id="password" isRequired>
							<InputGroup>
								<Input
									size="lg"
									type={showPassword ? "text" : "password"}
									borderRadius="10"
									placeholder="Password"
									name="password"
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
						</FormControl>
						<FormControl id="password" isRequired>
							<InputGroup>
								<Input
									size="lg"
									type={showConfirmPassword ? "text" : "password"}
									borderRadius="10"
									placeholder="Confirm your password"
									name="confirm_password"
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={""}
										onClick={() =>
											setShowConfirmPassword(
												(showConfirmPassword) => !showConfirmPassword
											)
										}
									>
										{showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<FormControl>
							<PhoneInput
								placeholder="Enter phone number"
								defaultCountry="PH"
								international
								inputComponent={Input}
								value={phoneInput}
								borderRadius="10"
								size="lg"
								onChange={setPhoneInput}
								isInvalid={
									phoneInput
										? isValidPhoneNumber(phoneInput)
											? undefined
											: true
										: false
								}
								countryCallingCodeEditable={false}
								name="phone_number"
							/>
						</FormControl>

						<Checkbox size="md">
							<Text fontSize={"small"}>
								By checking the box you agree to our{" "}
								<Link color={"#6C63FF"} href="#">
									Terms and Conditions
								</Link>
							</Text>
						</Checkbox>

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
							>
								Continue
							</Button>
							<Text>
								Already have an account?{" "}
								<Link color={"#00B11C"} href="/login">
									Sign in
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</form>
	);
};

export default Register;
