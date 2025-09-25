import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

/**
 * Toaster
 * Top-level component that renders current toasts from the `useToast` hook.
 *
 * Integration notes:
 * - Place <Toaster /> near the app root (e.g., in App.jsx) so toasts overlay
 *   the UI consistently.
 * - The `useToast` hook (in `src/hooks/use-toast`) is expected to expose a
 *   `toasts` array where each toast has { id, title, description, action, ... }.
 * - Each toast item is forwarded to the `Toast` primitive and the viewport
 *   is rendered once at the end to position/contain the toasts.
 */
export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          // Each Toast is a Radix Root instance. `...props` can include
          // `duration`, `onOpenChange`, `variant`, etc. We render title/
          // description conditionally to avoid empty elements.
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      {/* The viewport is required for Radix to render the toasts at the
          configured position. Keep it once per app. */}
      <ToastViewport />
    </ToastProvider>
  );
}