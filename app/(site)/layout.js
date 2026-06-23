import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

export default function SiteLayout({ children }) {
  return (
    <>
      {/* Fixed Navbar */}
      <Navbar />

      {/* Page Content Wrapper */}
      <main className="mt-16 min-h-screen bg-white">{children}</main>

      {/* Footer */}
      <Footer />
    </>
  );
}
