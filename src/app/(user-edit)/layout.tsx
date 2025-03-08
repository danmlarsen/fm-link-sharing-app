import PreviewButton from "@/components/preview-button";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/logo";
import CustomizeNavButtons from "@/components/customize-nav-buttons";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr] gap-4">
      <header>
        <Card className="rounded-t-none">
          <CardContent className="flex justify-between">
            <Logo />
            <CustomizeNavButtons />
            <div>
              <PreviewButton />
            </div>
          </CardContent>
        </Card>
      </header>

      <div className="grid lg:grid-cols-[auto_1fr]">
        <aside className="hidden lg:block">aside</aside>
        <main className="grid px-4">
          <div className="mx-auto w-full max-w-2xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
