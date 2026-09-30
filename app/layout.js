import "./globals.css";

export const metadata = {
  title: "Нам полгода ❤",
  description: "Небольшое письмо для самого любимого человека",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff5f7",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Marck+Script&display=swap&subset=cyrillic"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
