import { AuthForm } from "@/components/authok/AuthForm";
export function AuthModal({
  open,
  onClose,
  onAuthSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-[760px]">
        {/* Only register form */}
        <AuthForm compact onSuccess={onAuthSuccess} onClose={onClose} />
      </div>
    </div>
  );
}
