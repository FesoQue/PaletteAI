import React, { useState } from "react";
import { useColorData } from "@/hooks/useColorData";

const Index = () => {
  const [colorCode, setColorCode] = useState("");
  const [result, setResult] = useState();

  const { isLoading, data, isError, error, refetch, isFetching } =
    useColorData(colorCode);

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
    setColorCode("");
  };
  const disable = !colorCode || isFetching;

  return (
    <main className="p-8">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="color_code"
          placeholder="#20262E"
          className="block border-1 border outline-none border-gray-500 w-full mb-3 h-[48px] rounded px-2"
          value={colorCode}
          onChange={(e) => setColorCode(e.target.value)}
        />
        <button
          disabled={disable}
          type="submit"
          className={`bg-[#10A37F] w-full h-[48px] rounded text-center text-white ${
            disable && "cursor-not-allowed opacity-50"
          }`}
        >
          Generate Color Guide
        </button>
      </form>

      <div>
        {isFetching && (
          <h1 className="text-2xl font-semibold text-center mt-4">
            Loading...
          </h1>
        )}
      </div>
    </main>
  );
};

export default Index;
