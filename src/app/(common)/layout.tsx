import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-screen-xl pb-4 pt-36">{children}</div>
      <Footer />
    </>
  );
}
