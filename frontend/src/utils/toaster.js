import { toast } from "react-hot-toast";

export const toaster = {
  success: (message, duration = 1500, options = {}) => {
    toast.dismiss();
    toast.success(message, { duration, ...options });
  },

  error: (message, duration = 1500, options = {}) => {
    toast.dismiss();
    toast.error(message, { duration, ...options });
  },

  loading: (message, duration = 1500, options = {}) => {
    toast.dismiss();
    toast.loading(message, { duration, ...options });
  },

  custom: (content, duration = 1500, options = {}) => {
    toast.dismiss();
    toast(content, { duration, ...options });
  },
};
