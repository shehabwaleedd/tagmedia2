import "./globals.css";
import Navbar from "@/components/navbar";
import FooterF from "@/components/footer";
import WhatsappIcon from "@/components/whatsappIcon";
import { AuthProvider } from "@/context/AuthContext";

type Metadata = {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    images: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
    siteName: string;
  };
  twitter: {
    card: string;
    site: string;
    title: string;
    description: string;
    images: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
  };
  apple: {
    statusBarStyle: "default" | "black" | "black-translucent" | "#142B6B";
  };
  ms: {
    tileColor: string;
  };
  canonical: string;
};

export const viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: "yes",
  viewportFit: "cover",
  themeColor: "#142B6B",
}


export const metadata: Metadata = {
  title: "Tag Media",
  description: "Tag Media is Egypt's pioneer in digital and influencer marketing. We transform brands to power growth.",
  openGraph: {
    title: "Tag Media",
    description: "Tag Media is Egypt's pioneer in digital and influencer marketing. We transform brands to power growth.",
    type: "website",
    images: {
      url: "https://res.cloudinary.com/dfxz1hh8s/image/upload/v1710376514/iiqbbhbi0ccgdsm8xtl6.jpg",
      alt: "Tag Media",
      width: 1200,
      height: 630,
    },
    siteName: "Tag Media",
  },
  twitter: {
    card: "summary_large_image",
    site: "@tagmediaeg",
    title: "Tag Media",
    description: "Tag Media is Egypt's pioneer in digital and influencer marketing. We transform brands to power growth.",
    images: {
      url: "https://res.cloudinary.com/dfxz1hh8s/image/upload/v1710376514/iiqbbhbi0ccgdsm8xtl6.jpg",
      alt: "Tag Media",
      width: 1200,
      height: 630,
    },
  },
  apple: {
    statusBarStyle: "default",

  },
  ms: {
    tileColor: "#000000",
  },
  canonical: "https://tagmediaeg.com",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <WhatsappIcon />
          <FooterF />
        </AuthProvider>
      </body>
    </html>
  );
}
