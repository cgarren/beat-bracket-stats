import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RootWrapper } from "./rootWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Beat Bracket Stats",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="shortcut icon" href="favicon.svg" />
            </head>

            <body className={inter.className}>
                <RootWrapper>{children}</RootWrapper>
            </body>
        </html>
    );
}
