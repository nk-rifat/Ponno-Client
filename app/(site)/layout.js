import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

export default function SiteLayout({ children }) {
  return (
    <>
      {/* Fixed Navbar */}
      <Navbar />

      {/* Page Content Wrapper */}
      <div className="pt-24 min-h-screen bg-white">
        <main className="max-w-7xl mx-auto">{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
