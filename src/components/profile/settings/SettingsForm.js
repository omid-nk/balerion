"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/client";

import ProfileSettings from "./ProfileSettings";
import PasswordSettings from "./PasswordSettings";

export default function SettingsForm({
  email,
  username: initialUsername,
  avatarUrl: initialAvatarUrl,
}) {
  const supabase = createClient();

  const [username, setUsername] = useState(initialUsername);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // -----------------------------------------
  // Profile
  // -----------------------------------------

  const handleProfileUpdate = async (event) => {
    event.preventDefault();

    const cleanUsername = username.trim();

    if (!cleanUsername) {
      toast.error("نام کاربری را وارد کنید");
      return;
    }

    if (cleanUsername.length < 3) {
      toast.error("نام کاربری باید حداقل ۳ کاراکتر باشد");
      return;
    }

    if (cleanUsername === initialUsername && avatarUrl === initialAvatarUrl) {
      toast.error("تغییری برای ذخیره وجود ندارد");
      return;
    }

    setProfileLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("لطفاً ابتدا وارد حساب کاربری شوید");
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          username: cleanUsername,
          avatar_url: avatarUrl || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) {
        console.error(error);

        if (error.code === "23505") {
          toast.error("این نام کاربری قبلاً استفاده شده است");
          return;
        }

        toast.error("ذخیره تغییرات انجام نشد");
        return;
      }

      toast.success("اطلاعات حساب با موفقیت بروزرسانی شد");
    } catch (error) {
      console.error(error);
      toast.error("خطایی هنگام ذخیره اطلاعات رخ داد");
    } finally {
      setProfileLoading(false);
    }
  };

  // -----------------------------------------
  // Password
  // -----------------------------------------

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();

    if (!currentPassword) {
      toast.error("رمز عبور فعلی را وارد کنید");
      return;
    }

    if (!newPassword) {
      toast.error("رمز عبور جدید را وارد کنید");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("رمز عبور جدید باید حداقل ۸ کاراکتر باشد");
      return;
    }

    if (currentPassword === newPassword) {
      toast.error("رمز عبور جدید نباید با رمز قبلی یکسان باشد");
      return;
    }

    setPasswordLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: currentPassword,
      });

      if (signInError) {
        toast.error("رمز عبور فعلی صحیح نیست");
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        console.error(updateError);
        toast.error("تغییر رمز عبور انجام نشد");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");

      toast.success("رمز عبور با موفقیت تغییر کرد");
    } catch (error) {
      console.error(error);
      toast.error("خطایی هنگام تغییر رمز عبور رخ داد");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <ProfileSettings
        username={username}
        setUsername={setUsername}
        avatarUrl={avatarUrl}
        setAvatarUrl={setAvatarUrl}
        email={email}
        loading={profileLoading}
        onSubmit={handleProfileUpdate}
      />

      <PasswordSettings
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        loading={passwordLoading}
        onSubmit={handlePasswordUpdate}
      />
    </div>
  );
}
