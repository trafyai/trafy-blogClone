import { Inter } from "next/font/google";
import '@styles/globals.css';
import Header from "@components/common/header/Header";
import Footer from "@components/common/footer/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "trafy blog | Latest on AI, Design, Marketing and Sales",
  description:
    "Learn UI/UX designing, artificial intelligence, and digital marketing with our interactive courses and accelerate your career with expert guidance",
  metadataBase: new URL("https://blog.trafyai.com/"),
  openGraph: {
    title: "trafy - Your Personalised AI mentor",
    description:
      "Learn UI/UX designing, artificial intelligence, and digital marketing with our interactive courses and accelerate your career with expert guidance",
  }
 

};
export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <head>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NX8D4BFD');`
        }}
      />

      </head>

      <body className={inter.className}>
            <Header/>
            {children}
            <Footer/>
        <GoogleAnalytics gaId=" G-329K7NDLKZ" />

        </body>
      
    </html>
  );
}
