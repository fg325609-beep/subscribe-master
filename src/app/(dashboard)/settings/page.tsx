import { ProfileForm } from "@/features/settings/components/ProfileForm";
import { ChangePasswordForm } from "@/features/settings/components/ChangePasswordForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

export default function SettingsPage() {
  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Sozlamalar</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profil ma'lumotlari</CardTitle>
        </CardHeader>
        <ProfileForm />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Parolni o'zgartirish</CardTitle>
        </CardHeader>
        <ChangePasswordForm />
      </Card>
    </div>
  );
}