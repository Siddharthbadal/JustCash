import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ChartBarIcon, ChartColumnStacked, ChartNoAxesCombined } from "lucide-react";
import { ClerkProvider, SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import UserDropdown from "@/components/UserDropdown";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['100', '200','300', '400','500','600','700','800','900']
});



export const metadata: Metadata = {
  title: "Just Cash",
  description: "Manage your Income and Expenses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang="en">
          <body
            className={`${poppins.variable} antialiased`}
          >
            <nav className="bg-slate-700 p-4 text-white h-20 flex items-center justify-between">
              <Link href={"/"} className="flex gap-1 text-2xl font-bold items-center">            
                <ChartNoAxesCombined className="text-white/80" />
                JustCash
              </Link>
              <div>
                <SignedOut>
                  <div className="flex items-center">
                    <Button asChild variant="link" 
                          className="text-white text-lg">
                        <SignInButton />
                    </Button>
                    <Button asChild variant={"link"}
                      className="text-white text-lg">
                      <SignUpButton />
                    </Button>
                  </div>
                </SignedOut>
                <SignedIn>
                      <UserDropdown />
                </SignedIn>
              </div>

            </nav>
            {children}

          </body>
        </html>
    </ClerkProvider>
  );
}
