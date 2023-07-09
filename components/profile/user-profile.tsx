import { getSession } from "next-auth/client";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
interface Props {
  oldPassword: string;
  newPassword: string;
}
function UserProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState();
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/auth");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p className={classes.profile}>Loading...</p>;
  }

  async function chnagePasswordHandler(passwordData: Props) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMessage(data);
    if (!data.message) {
      router.replace("/");
    }
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={chnagePasswordHandler} data={message} />
    </section>
  );
}

export default UserProfile;
