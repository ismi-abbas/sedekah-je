import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";

import { DisclaimerModal } from "@/components/disclaimer";
import { QueryProvider } from "@/components/providers/query-provider";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRoute,
} from "@tanstack/react-router";
import { NuqsAdapter } from "nuqs/adapters/tanstack-router";
import appCss from "./globals.css?url";

// const { Poppins } = pkg;

// export const metadata: Metadata = {
// 	title: {
// 		default: "Sedekah Je - Platform Sedekah QR Malaysia",
// 		template: "%s | Sedekah Je",
// 	},
// 	description:
// 		"Platform digital untuk memudahkan sedekah ke masjid, surau dan institusi di Malaysia, dengan hanya satu imbasan QR.",
// 	keywords: [
// 		"sedekah",
// 		"sedekah qr",
// 		"sedekah jumaat",
// 		"sedekah malaysia",
// 		"sedekahje",
// 		"sedekah je",
// 		"sedekah qr",
// 		"sedekah je qr",
// 		"opensource sedekah qr",
// 		"sedekah malaysia",
// 		"sedekah malaysia qr",
// 		"sedekah malaysia qr codes",
// 		"senarai qr sedekah malaysia",
// 		"qr sedekah malaysia",
// 		"qr code sedekah malaysia",
// 		"derma digital",
// 		"pembayaran digital masjid",
// 		"sumbangan digital",
// 	],
// 	metadataBase: new URL("https://sedekah.je"),
// 	alternates: {
// 		canonical: "https://sedekah.je",
// 	},
// 	robots: {
// 		index: true,
// 		follow: true,
// 		googleBot: {
// 			index: true,
// 			follow: true,
// 			"max-video-preview": -1,
// 			"max-image-preview": "large",
// 			"max-snippet": -1,
// 		},
// 	},
// 	openGraph: {
// 		type: "website",
// 		url: "https://sedekah.je",
// 		title: "Sedekah Je",
// 		description:
// 			"Senarai QR code masjid, surau dan institusi di Malaysia yang dikumpul dan disumbang oleh komuniti",
// 		siteName: "Sedekah Je",
// 		images: [
// 			{
// 				url: "https://sedekah.je/sedekahje-og-compressed.png",
// 				width: 1200,
// 				height: 630,
// 			},
// 		],
// 		locale: "ms_MY",
// 		countryName: "Malaysia",
// 	},
// 	twitter: {
// 		card: "summary_large_image",
// 		site: "@asdfghjkhairin",
// 		creator: "@asdfghjkhairin",
// 		title: "Sedekah Je",
// 		description:
// 			"Senarai QR code masjid, surau dan institusi di Malaysia yang dikumpul dan disumbang oleh komuniti",
// 		images: "https://sedekah.je/sedekahje-twitter.png",
// 	},
// };

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content:
					"width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
			},
			{ title: "TanStack Start Starter" },
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	component: RootLayout,
	notFoundComponent: () => {
		return <p>This setting page doesn't exist!</p>;
	},
});

function RootLayout() {
	//   const nextHeaders = headers();
	//   const pathname = nextHeaders.get("x-pathname");

	//   // opt out default layout for /qr/:slug
	//   const regex = /^\/qr\/([a-zA-Z0-9_-]+)$/;
	//   if (pathname && regex.test(pathname)) {
	//     return (
	//       <html suppressHydrationWarning lang="en">
	//         {/* <body>{children}</body> */}
	//         <Outlet />
	//         <Scripts />
	//       </html>
	//     );
	//   }

	return (
		<html lang="ms" suppressHydrationWarning>
			<head>
				{/* <ThemeScript /> */}
				<HeadContent />
			</head>
			<body
				className={cn(
					"bg-background transition-colors duration-200 ease-in-out overscroll-y-none",
				)}
			>
				<NuqsAdapter>
					<QueryProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<Analytics />
							<Outlet />
							<Scripts />
							<Toaster richColors />
							<DisclaimerModal />
						</ThemeProvider>
					</QueryProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
