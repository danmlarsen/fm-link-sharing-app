import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileDetails from "./profile-details";

export default function ProfileDetailsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
        <CardDescription>
          Add your details to create a personal touch to your profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileDetails />
      </CardContent>
    </Card>
  );
}
