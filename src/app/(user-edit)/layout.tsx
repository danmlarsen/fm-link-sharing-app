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
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      <header>
        <Card className="rounded-t-none">
          <CardContent className="mx-auto flex w-full max-w-[90rem] items-center justify-between">
            <Logo />
            <CustomizeNavButtons />
            <div>
              <PreviewButton />
            </div>
          </CardContent>
        </Card>
      </header>

      <div className="grid p-4 md:p-6">{children}</div>
    </div>
  );
}
