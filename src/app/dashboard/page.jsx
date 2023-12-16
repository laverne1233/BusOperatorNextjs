
import { Heading } from "@chakra-ui/react";
import { getServerSession } from "next-auth";

const Page = () => {
	const user = getServerSession();
	console.log(user);
	return (
		<>
				<Heading>Sample main dashboard</Heading>
		</>
	);
};

export default Page;
