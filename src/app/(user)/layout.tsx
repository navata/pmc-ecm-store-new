export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container mx-auto">{children}</div>
    </>
  );
}
