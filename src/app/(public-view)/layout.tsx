import PreviewHeader from "./[profileId]/preview-header";

export default function PublicViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr] gap-[60px]">
      <PreviewHeader />
      <main>{children}</main>
    </div>
  );
}
