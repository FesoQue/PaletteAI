import { useQuery } from "@tanstack/react-query";

const fetchColorData = async (colorCode) => {
  try {
    const response = await fetch("/api/generatecolor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ color: colorCode }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.result.split("\n");
  } catch (error) {
    return error.message;
  }
};

export const useColorData = (colorCode) => {
  return useQuery({
    queryKey: ["color", colorCode],
    queryFn: () => fetchColorData(colorCode),
    enabled: false,
    useErrorBoundary: true,
  });
};
