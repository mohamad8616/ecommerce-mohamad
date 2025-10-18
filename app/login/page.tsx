
import { LoginForm } from "@/app/components/login-form";
export default function LoginPage() {
  return (
    <div className="flex h-auto flex-col items-center justify-center overflow-hidden bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
