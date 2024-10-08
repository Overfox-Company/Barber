
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import './fonts.css'
import Theme from "@/theme/Theme";
import { AppContextProvider } from "@/context/AppContext";
import { PrincipalContainer } from "@/components/Layout/Layout";
import { Box } from "@mui/material";
import SideMenuMobile from "@/components/sideMenu/SideMenuMobile";
import SideMenu from "@/components/sideMenu";
import SnackbarCustom from "@/components/UI/Alerts";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luis barber",
  description: "System for managment of luis barbers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Theme>

      <html lang="en">
        <AppContextProvider>
          <body className={inter.className}>
            <SnackbarCustom />
            <Box sx={{ display: { xs: 'static', lg: 'flex' }, }} >
              <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
                <SideMenu />
              </Box>
              <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
                <SideMenuMobile />
              </Box>
              <PrincipalContainer>
                {children}
              </PrincipalContainer>
            </Box>
          </body>
        </AppContextProvider>
      </html>
    </Theme>

  );
}
