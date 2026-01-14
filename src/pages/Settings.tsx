import { ProfileSettings } from "@/components/ProfileSettings";

export default function Settings() {
  return (
    <div className="container max-w-2xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Configuración</h1>
      <ProfileSettings />
    </div>
  );
}
