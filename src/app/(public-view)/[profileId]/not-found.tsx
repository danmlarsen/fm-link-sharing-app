import { Card, CardContent } from "@/components/ui/card";

export default function ProfileNotFoundPage() {
  return (
    <Card className="mx-auto max-w-md">
      <CardContent>
        <h1 className="text-foreground text-2xl font-semibold">
          Profile could not be found.
        </h1>
        <p>Please check your url and make sure the required data is saved</p>
      </CardContent>
    </Card>
  );
}
