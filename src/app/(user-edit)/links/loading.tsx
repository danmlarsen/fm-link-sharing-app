import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PhoneMockup from "@/components/ui/phone-mockup";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[auto_1fr]">
      <aside className="hidden w-[25rem] lg:grid">
        <Card>
          <CardContent>
            <PhoneMockup />
          </CardContent>
        </Card>
      </aside>
      <main className="grid">
        <Card>
          <CardHeader>
            <CardTitle>Customize your links</CardTitle>
            <CardDescription>
              Add/edit/remove links below and then share all your profiles with
              the world!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
