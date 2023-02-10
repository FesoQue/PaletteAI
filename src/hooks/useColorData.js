import { useQuery } from "@tanstack/react-query";

const fetchColorData = async (colorCode) => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ color: colorCode }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw (
        data.error || new Error(`Request failed with status ${response.status}`)
      );
    }
    return data.result.split("\n");
  } catch (error) {
    return error.message;
  }
};

export const useColorData = (colorCode, onError) => {
  return useQuery({
    queryKey: ["color"],
    queryFn: () => fetchColorData(colorCode),
    enabled: false,
    useErrorBoundary: true,
    onError: onError,
  });
};
