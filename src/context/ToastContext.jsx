import { useCallback, useMemo, useState } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { ToastContext } from "./toast-context";
import "../styles/toast.css";

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (message, type) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => remove(id), 3500);
    },
    [remove]
  );

  const api = useMemo(
    () => ({
      success: (message) => show(message, "success"),
      error: (message) => show(message, "error"),
    }),
    [show]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}

      <div className="toast-container" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            {t.type === "success" ? (
              <CheckCircle size={19} />
            ) : (
              <AlertCircle size={19} />
            )}
            <span>{t.message}</span>
            <button
              type="button"
              className="toast-close"
              onClick={() => remove(t.id)}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}