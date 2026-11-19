import type { Metadata, Viewport } from "next";
import "@/styles.css";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export const metadata: Metadata = {
    title: "Abigail Ola",
    description:
        "Meet Abigail Ola, an Infomation Technology student building thoughtful web experiences with code, curiosity, and care.",
    openGraph: {
        title: "Abigail Ola — Information Technology Student",
        description:
            "A Information Technology student building thoughtful web experiences.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
    },
    authors: [{ name: "Abigail Ola" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap"
                />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </head>
            <body>{children}</body>
        </html>
    );
}

