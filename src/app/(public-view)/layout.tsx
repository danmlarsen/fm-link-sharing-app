import PreviewHeader from "./[profileId]/preview-header";

export default function PublicViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative grid min-h-screen grid-rows-[auto_1fr] gap-[3.75rem]">
      <div className="bg-primary absolute top-0 right-0 left-0 -z-10 hidden h-[22.3125rem] rounded-b-4xl md:block" />
      <PreviewHeader />
      <main className="flex flex-col px-4 md:px-0">{children}</main>
    </div>
  );
}
