import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else toast.error(error?.data?.message || "Something went wrong");
      }
    });
  }, [errors]);
};

 

export const useAsyncMutation = (mutatationHook) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const [mutate] = mutatationHook();

  const executeMutation = async (toastMessage, ...args) => {
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || "Updating data...");

    try {
      const res = await mutate(...args);

      if (res.data) {
        toast.success(res.data.message || "Updated data successfully", {
          id: toastId,
        });
        setData(res.data);
      } else {
        toast.error(res?.error?.data?.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return [executeMutation, isLoading, data];
};



export const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    if (!socket) return;

    // Attach event listeners
    Object.entries(handlers).forEach(([eventName, handler]) => {
      socket.on(eventName, handler);
    });

    // Cleanup on unmount
    return () => {
      Object.entries(handlers).forEach(([eventName, handler]) => {
        socket.off(eventName, handler);
      });
    };
  }, [socket, handlers]);
};
