import { Card, CardContent } from "@/components/ui/card";

export default function ProfileNotFoundPage() {
  return (
    <Card className="mx-auto max-w-md">
      <CardContent className="grid place-items-center text-2xl font-semibold">
        Profile could not be found.
      </CardContent>
    </Card>
  );
}
