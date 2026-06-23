import AuthProvider from "@/provider/AuthProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import ReduxProvider from "@/provider/ReduxProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>

      <body>
        <ReduxProvider>
          <AuthProvider>
            <main>
              {children}
              {modal}
            </main>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
