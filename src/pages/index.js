import React, { useState } from "react";
import { useColorData } from "@/hooks/useColorData";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import ErrorHandler from "@/helper/ErrorHandler";
import { defaultData } from "@/data/defaultdata";
import { Search } from "@/components/Search";

const Index = () => {
  const [colorCode, setColorCode] = useState("#FFFAEF");

  const onError = (error) => {
    return toast.error(error.message);
  };

  const { data, isError, error, refetch, isFetching } = useColorData(
    colorCode,
    onError
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  function convertHexToRgba(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function validateColorCode(colorCode) {
    if (colorCode.startsWith("#")) {
      // validate hex code. support 3 and 6 hex code
      if (
        /^#[0-9A-F]{6}$/i.test(colorCode) ||
        /^#[0-9A-F]{3}$/i.test(colorCode)
      ) {
        return true;
      }
    } else if (colorCode.startsWith("rgb")) {
      // validate rgb code
      let splitCode = colorCode.split(",");
      if (splitCode.length === 3) {
        for (let i = 0; i < 3; i++) {
          let value = parseInt(splitCode[i].trim());
          if (value < 0 || value > 255) {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  }

  function isColor(strColor) {
    var s = new Option().style;
    s.color = strColor;
    return s.color == strColor;
  }

  const isValidatedColor = validateColorCode(colorCode) || isColor(colorCode);

  const disable = !colorCode || isFetching || (colorCode && !isValidatedColor);

  function clickToCopy(text) {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }

  return (
    <main className=" pt-20">
      <div className="min-h-[82vh] max-w-[1100px] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2">
            Palette<span className="text-[#10A37F]">AI</span>
            <span className="text-4xl">🎨</span>
          </h1>
          <p className="text-[18px]">
            Create beautiful color palette using AI.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto mb-20 px-10"
          autoComplete="off"
        >
          <div className="input border-gray-500 w-full mb-6 h-[51px] rounded-[12px] border-1 border bg-whiter flex items-center hover:transition-all ease-in-out">
            <span className="h-full flex items-center px-3 text-gray-500">
              <Search />
            </span>
            <input
              type="text"
              required
              name="color_code"
              placeholder="Enter a valid color 😉"
              className="outline-none border-none h-full w-full bg-transparent"
              value={colorCode}
              onChange={(e) => setColorCode(e.target.value)}
            />
          </div>
          <button
            className={`pushable w-full ${disable && "opacity-50"}`}
            style={{ cursor: disable && "not-allowed" }}
            disabled={disable}
          >
            <span className="front text-center">
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
            </span>
          </button>
        </form>
        <section className="pb-20">
          {isFetching ? (
            // <h1 className="text-2xl font-semibold text-center mt-4">
            //   Loading...
            // </h1>
            <div className="flex justify-center">
              <img src="/cube-loader.svg" alt="loader" />
            </div>
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
        </section>
      </div>

      {/* footer */}
      <footer className="bg-[#F1F5F9]">
        <div className="max-w-[1100px] mx-auto h-full flex items-center justify-between px-4">
          <p>
            © {new Date().getFullYear()}{" "}
            <a href="#" className="text-[#334155] font-semibold">
              Qudus A.
            </a>
          </p>
          <p>
            Made with ❤️ &&{" "}
            <a href="#" className="text-[#334155] font-semibold">
              openai
            </a>
          </p>
        </div>
      </footer>
      <Toaster />
    </main>
  );
};

export default Index;
