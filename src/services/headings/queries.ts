import { useQuery } from "@tanstack/react-query";
import { Heading } from "./types";

type ServerResponse<T> = {
  data: T;
  message: string;
  pagination: unknown;
  error: boolean;
};

const getHeadings = async (): Promise<ServerResponse<Heading[]>> => {
  try {
    const response = await fetch("http://localhost:4000/heading");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data; // You can return the data if needed.
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error; // Propagate the error for handling at a higher level if necessary.
  }
};

export const useHeadingsQuery = () => {
  return useQuery({
    queryKey: ["headings"],
    queryFn: getHeadings,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60000,
  });
};
