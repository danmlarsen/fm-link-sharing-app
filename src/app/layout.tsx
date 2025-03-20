import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth";
import { Toaster } from "@/components/ui/sonner";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Link Sharing App",
  description: "Developed by danmarius.no",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.className} bg-background antialiased`}>
        <AuthProvider>
          {children}
          {modal}
        </AuthProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
