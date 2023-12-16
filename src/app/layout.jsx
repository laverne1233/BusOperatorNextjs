import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { AppTitle } from "@/utils/constants";
import { getServerSession } from "next-auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }) {
	return {
		title: AppTitle,
		description: "Generated by create next app",
	};
}

export default async function RootLayout({ children }) {
	const session = await getServerSession();
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers session={session}>{children}</Providers>
			</body>
		</html>
	);
}
