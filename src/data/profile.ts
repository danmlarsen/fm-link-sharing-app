import { firestore } from "@/firebase/server";
import { TProfile } from "@/types/profile";

export async function getProfile(userId: string) {
  try {
    const profileSnapshot = await firestore
      .collection("profiles")
      .where("uid", "==", userId)
      .get();

    let profileData = profileSnapshot.docs[0]?.data();
    if (profileData) {
      profileData = { id: profileSnapshot.docs[0].id, ...profileData };
    }

    if (!profileData) {
      profileData = await firestore.collection("profiles").add({
        uid: userId,
        firstName: "",
        lastName: "",
        email: "",
        links: [],
      });
    }

    return {
      data: { ...profileData } as TProfile,
    };
  } catch (e) {
    console.log(e);
    return { data: null };
  }
}
