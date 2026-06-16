import ProfileHeader from "@/src/components/profile/ProfileHeader";
import AccountSidebar from "@/src/components/profile/Sidebar";
import ProfileUpdateForm from "@/src/components/profile/ProfileUpdateForm";

export default function AccountPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-[135px] py-10">
      <ProfileHeader />

      <div className="mt-20 flex flex-col lg:flex-row gap-12 justify-between">
        <AccountSidebar />
        <ProfileUpdateForm />
      </div>
    </div>
  );
}