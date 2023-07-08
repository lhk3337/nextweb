import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm({ onChangePassword }: any) {
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enterOldPassword = oldPasswordRef.current!.value;
    const enterNewPassword = newPasswordRef.current!.value;
    onChangePassword({
      oldPassword: enterOldPassword,
      newPassword: enterNewPassword,
    });
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
