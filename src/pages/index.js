import React, { useState } from "react";
import axios from "axios";

const Index = () => {
  const [colorCode, setColorCode] = useState("");
  const [result, setResult] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ color: colorCode }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      // console.log(data.result);
      setResult(data.result);
      setColorCode("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  };

  const aaa = result.split("\n");
  console.log(aaa);

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
          // disabled={colorCode === ""}
          type="submit"
          className="bg-[#10A37F] w-full h-[48px] rounded text-center text-white"
        >
          Generate Color Guide
        </button>
      </form>
    </main>
  );
};

export default Index;
