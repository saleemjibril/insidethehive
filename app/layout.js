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

const siteName =
  process.env.NEXT_PUBLIC_SITE_NAME || "Inside The Hive";

const defaultDescription =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  "The first Web3 media hub sharing stories + education on Web3 & Gaming. Trusted by builders, founders, and ecosystems shaping African Web3 ecosystem.";

/** Default share image: set NEXT_PUBLIC_OG_IMAGE_URL or add /public/og.png (1200×630). */
const defaultOgImage =
  process.env.NEXT_PUBLIC_OG_IMAGE_URL || "/og.png";

/** X/Twitter @handle for twitter:site (no @ in env is OK). */
const twitterSite =
  process.env.NEXT_PUBLIC_TWITTER_SITE || "@insidedhive";

const base = new URL(siteUrl);

export const metadata = {
  metadataBase: base,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName,
    title: siteName,
    description: defaultDescription,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: twitterSite.startsWith("@") ? twitterSite : `@${twitterSite}`,
    title: siteName,
    description: defaultDescription,
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

        <Header />
        <Toast />
        <ScrollToTop />

        <ReduxProvider>{children}</ReduxProvider>
      <Analytics />
      </body>
    </html>
  );
}
