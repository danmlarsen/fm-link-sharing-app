import PreviewHeader from "./[profileId]/preview-header";

export default function PublicViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative grid min-h-screen grid-rows-[auto_1fr] gap-[60px]">
      <div className="bg-primary absolute top-0 right-0 left-0 -z-10 hidden h-[357px] rounded-b-4xl md:block" />
      <PreviewHeader />
      <main>{children}</main>
    </div>
  );
}
