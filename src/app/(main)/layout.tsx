import LinksButton from "@/components/links-button";
import PreviewButton from "@/components/preview-button";
import ProfileButton from "@/components/profile-button";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/logo";

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
            <div>
              <LinksButton />
              <ProfileButton />
            </div>
            <div>
              <PreviewButton />
            </div>
          </CardContent>
        </Card>
      </header>

      <div className="grid md:grid-cols-[auto_1fr]">
        <aside className="hidden md:block">aside</aside>
        <main className="grid px-4">{children}</main>
      </div>
    </div>
  );
}
