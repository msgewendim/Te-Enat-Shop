import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ErrorBoundary from "@/components/error/Error";
import ContextProvider from "@/providers/context/ContextProvider";
import QueryProvider from "@/providers/context/QueryClient";
import I18nProvider from "../providers/context/I18nProvider"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Tenat Shop",
	description: "Tenat Shop Ethio-Israeli Food",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Suspense fallback={<p>Loading...</p>}>
				<QueryProvider>
				<I18nProvider>
					<ContextProvider>
						<ErrorBoundary>
							<Navbar />

							{children}
							<Footer />
						</ErrorBoundary>
					</ContextProvider>
					</I18nProvider>
				</QueryProvider>
				</Suspense>
			</body>
		</html>
	);
}
