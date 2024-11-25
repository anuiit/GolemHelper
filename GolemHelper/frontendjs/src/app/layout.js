
import localFont from "next/font/local";
import "./globals.css";
import { LoadingProvider } from "@/context/loadingContext";
import { Provider } from "@/components/ui-chakra/provider"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LoadingProvider>
          <Provider>
            {children}
          </Provider>
        </LoadingProvider>
      </body>
    </html>
  );
}
