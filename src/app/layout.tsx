// layout.tsx (server component)
import { comicNeue } from "@/font";
import "@/app/globals.css"
import Providers from "./providers";
import FloatingButtons from "@/components/FloatingButtons";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={comicNeue.variable}>
      <body className="relative">
        <Providers>
          <FloatingButtons />
          {children}
        </Providers>
      </body>
    </html>
  );
}
