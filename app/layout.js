import "react-tweet/theme.css";
import "../styles/index.scss";
import { Inter, Syne, Geist } from "next/font/google";
import localFont from "next/font/local";
import Header from "./components/header";
import ReduxProvider from "./store/ReduxProvider";
import CryptoPriceTicker from "./components/cryptoPrices";
import { Toast } from './toast';
import ScrollToTop from "./components/scrollToTop";
import { Analytics } from "@vercel/analytics/next"

const silkFlower = localFont({
  src: "../public/assets/SilkFlower.woff2",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-silkflower",
});

const durkWide = localFont({
  src: "../public/assets/DrukWideBold.ttf",
  weight: "200 800", // For variable fonts, specify the weight range
  subsets: ["latin"],
  display: "swap",
  variable: "--font-durkwide",
});

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
});
const geist = Geist({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.insidethehive.com";

/** Default share image: set NEXT_PUBLIC_OG_IMAGE_URL or add /public/og.png (1200×630). */
const defaultOgImage =
  process.env.NEXT_PUBLIC_OG_IMAGE_URL || "/og.png";

export const metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Inside The Hive",
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Inside The Hive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [defaultOgImage],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`
       ${syne.variable} ${inter.variable} ${geist.variable} ${durkWide.variable} ${silkFlower.variable}`}
    >
      <body>
            <CryptoPriceTicker />

        {/* <Header /> */}
        <Toast />
        <ScrollToTop />

        <ReduxProvider>{children}</ReduxProvider>
      <Analytics />
      </body>
    </html>
  );
}
