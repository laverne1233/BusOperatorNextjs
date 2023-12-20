"use client";

import Layout from "@/components/layout";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export function Providers({ children, session }) {
	return (
		<SessionProvider session={session}>
			<ProgressBar
				height="4px"
				options={{ showSpinner: true }}
				shallowRouting
			/>
			<CacheProvider>
				<ChakraProvider>
					{session ?
						(
							<>
								<Layout>{children}</Layout>
							</>
						)
						:
						(<>{children}</>)
					}
				</ChakraProvider>
			</CacheProvider >
		</SessionProvider >
	);
}
