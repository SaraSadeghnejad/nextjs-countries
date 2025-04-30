

import { Navbar } from "@/components/Navbar";
import StoreProvider from "@/state/redux";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <div className="h-full w-full mt-24 mx-auto p-8">
        <Navbar />
        <main>{children}</main>
      </div>
    </StoreProvider>
  );
}
