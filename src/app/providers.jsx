"use client";

import Layout from "@/components/layout";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children, session }) {
	return (
		<SessionProvider session={session}>
			<CacheProvider>
				<ChakraProvider>
					{session ? <Layout>{children}</Layout> : { children }}
				</ChakraProvider>
			</CacheProvider>
		</SessionProvider>
	);
}
