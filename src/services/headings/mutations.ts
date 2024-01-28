// import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../main";

// import api from "src/config/api";

// import { Heading } from "./types";

// export const useUpdateHeadingMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationKey: ["updateHeading"],
//     mutationFn: (options: { id: string; data: Partial<Heading> }) => {
//       return api.put(`heading/${options.id}`, options.data);
//     },

//     onSuccess: async () =>
//       await queryClient.invalidateQueries({
//         queryKey: ["headings"],
//       }),
//   });
// };

// export const usePostHeadingMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationKey: ["postHeading"],
//     mutationFn: (data: Partial<Heading>) => {
//       return api.post("heading/", data);
//     },

//     onSuccess: async () =>
//       await queryClient.invalidateQueries({
//         queryKey: ["headings"],
//       }),
//   });
// };

// export const useDeleteHeadingMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationKey: ["deleteHeading"],
//     mutationFn: (id: string) => {
//       return api.delete(`heading/delete/${id}`);
//     },

//     onSuccess: async () =>
//       await queryClient.invalidateQueries({
//         queryKey: ["headings"],
//       }),
//   });
// };

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
    },

    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ["headings"],
      }),
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
    },

    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ["headings"],
      }),
  });
};
