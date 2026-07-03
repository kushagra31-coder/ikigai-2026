import { LoginForm } from '@/features/authentication/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-muted/20 px-4">
      <LoginForm />
    </div>
  );
}
