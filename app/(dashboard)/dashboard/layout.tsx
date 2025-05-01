import { Navbar } from "@/components/Navbar";
import StoreProvider from "@/state/redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <Navbar />
      <div className="h-full w-full">
        <main className={`h-full flex w-full flex-col mt-24 sm:p-4 sm:mx-auto`}>{children}</main>
      </div>
    </StoreProvider>
  );
}
