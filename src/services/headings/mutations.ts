import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../main";
import { Heading } from "./types";
import store from "../../redux";
import { openToast } from "../../redux/toastSlice";

export const useUpdateHeadingMutation = () => {
  return useMutation({
    mutationKey: ["updateHeading"],

    mutationFn: async (options: { id: string; data: Partial<Heading> }) => {
      console.log(options);
      const response = await fetch(
        `http://localhost:4000/heading/${options.id}`,
        {
          method: "PUT",
          body: JSON.stringify(options.data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["headings"],
      });
      store.dispatch(openToast({ message: "Rubro editado" }));
    },

    onError() {
      store.dispatch(
        openToast({ message: "Error editando un rubro", error: true })
      );
    },
  });
};

export const usePostHeadingMutation = () => {
  return useMutation({
    mutationKey: ["postHeading"],

    mutationFn: async (data: Partial<Heading>) => {
      const response = await fetch("http://localhost:4000/heading/", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    },

    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ["headings"],
      }),
  });
};

export const useDeleteHeadingMutation = () => {
  return useMutation({
    mutationKey: ["deleteHeading"],

    mutationFn: async (id: string) => {
      const response = await fetch(`heading/delete/${id}`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    },

    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ["headings"],
      }),
  });
};

export const useActivateHeadingMutation = () => {
  return useMutation({
    mutationKey: ["activateHeading"],
    mutationFn: async (id: string) => {
      const response = await fetch(
        `http://localhost:4000/heading/activate/${id}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["headings"],
      });
      store.dispatch(openToast({ message: "Rubro activado" }));
    },

    onError: () => {
      store.dispatch(
        openToast({ message: "Error activando un rubro", error: true })
      );
    },
  });
};

export const useDisableHeadingMutation = () => {
  return useMutation({
    mutationKey: ["disableHeading"],
    mutationFn: async (id: string) => {
      const response = await fetch(
        `http://localhost:4000/heading/disable/${id}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const realResponse = await response.json();

      return realResponse;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["headings"],
      });

      store.dispatch(openToast({ message: "Rubro desactivado" }));
    },

    onError() {
      store.dispatch(
        openToast({ message: "Error activando un rubro", error: true })
      );
    },
  });
};
