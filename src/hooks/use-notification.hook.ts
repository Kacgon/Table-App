import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function useNotification() {
  const success = (message: string) => {
    toast.warning(message, {
      icon: "✔️",
    });
  };

  const failure = (message: string) => {
    toast.warning(message, {
      icon: "❌",
    });
  };
  return { failure, success };
}
