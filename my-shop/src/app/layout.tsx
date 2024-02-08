'use client'


//@ts-ignore
import { ChakraProvider } from "@chakra-ui/react";
import { AppProvider } from "./Core/Context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        
        <AppProvider>
          <ChakraProvider cssVarsRoot="body">
            {children}
          </ChakraProvider>
        </AppProvider>
      </body>
    </html>
  )
}
