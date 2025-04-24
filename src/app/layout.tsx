import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import SessionProviderWrapper from "@/components/SessionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "NextShop",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`flex flex-col min-h-screen ${inter.className}`}>
                <SessionProviderWrapper>
                    <ReactQueryProvider>
                        <Header />
                        {/* <main className="flex-1 flex flex-col items-center">
                            {children}
                        </main>
                        <Footer /> */}
                    </ReactQueryProvider>
                </SessionProviderWrapper>
            </body>
        </html>
    );
}
