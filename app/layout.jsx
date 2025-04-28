// app/layout.jsx
import ThemeRegistry from "./ThemeRegistry";

export const metadata = {
  title: "Mening Saytim",
  description: "MUI bilan Next.js Step Form",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
