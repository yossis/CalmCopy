import type { Metadata } from "next";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";
import { SessionProvider } from "@/context/SessionContext";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "CalmCopy",
  description: "Internal AI Content Generation Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SettingsProvider>
          <SessionProvider>
            <div className="app-container">
              <Navbar />
              <Breadcrumbs />
              {children}
            </div>
          </SessionProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
