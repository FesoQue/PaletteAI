import React, { useState } from "react";
import { useColorData } from "@/hooks/useColorData";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import ErrorHandler from "@/helper/ErrorHandler";
import { defaultData } from "@/data/defaultdata";

const Index = () => {
  const [colorCode, setColorCode] = useState("#FFFAEF");

  const onError = (error) => {
    return toast.error(error.message);
  };

  const { data, isError, error, refetch, isFetching } = useColorData(
    colorCode,
    onError
  );

  const disable = !colorCode || isFetching;

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  function convertHexToRgba(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b})`;
  }

  function clickToCopy(text) {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }

  return (
    <main className="max-w-[1100px] mx-auto py-20">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-semibold mb-1">
          Palette<span className="text-[#10A37F]">AI</span>.
        </h1>
        <p className="text-xl">Create a color palette using AI.</p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-20 px-10">
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
          className={`bg-[#10A37F] w-full h-[48px] rounded text-center text-white capitalize font-semibold text-xl ${
            disable && "cursor-not-allowed opacity-50"
          }`}
        >
          {isFetching ? (
            <ClipLoader
              color={"#fff"}
              loading={isFetching}
              size={20}
              aria-label="Loading Spinner"
            />
          ) : (
            "Generate palette"
          )}
        </button>
      </form>

      <div>
        {isFetching ? (
          <h1 className="text-2xl font-semibold text-center mt-4">
            Loading...
          </h1>
        ) : (
          <div className="bg-red-300">
            <ErrorHandler>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data?.map((color, i) => {
                  const convertToArr = color.split(":");
                  const paletteName = convertToArr[0];
                  const paletteColor = convertToArr[1].split(" ")[1];
                  return (
                    <div
                      key={i}
                      className={`w-full min-h-[220px] py-8 pl-8 `}
                      style={{ background: `${paletteColor}` }}
                    >
                      <div className="flex flex-col justify-end h-full">
                        {/* <div
                          className="w-[100px] h-[100px] mb-2"
                          style={{
                            background: `rgba(255, 255, 255, .2)`,
                          }}
                        ></div> */}
                        <p className="font-semibold text-sm uppercase mb-2 underline underline-offset-4">
                          {paletteName}
                        </p>
                        <p className="font-semibold text-sm uppercase mb-1">
                          {paletteColor}
                        </p>
                        <p className="font-semibold text-sm uppercase">
                          {convertHexToRgba(paletteColor)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ErrorHandler>
          </div>
        )}
      </div>
      <Toaster />
    </main>
  );
};

export default Index;
