import React, { useState } from "react";
import { useColorData } from "@/hooks/useColorData";
import { BeatLoader } from "react-spinners";
import ErrorHandler from "@/helper/ErrorHandler";
import { Search, View } from "@/icons/icons";
import MyDialog from "@/components/Modal";
import Head from "next/head";
import { Love } from "@/icons/icons";
import Error from "@/components/Error";
import Image from "next/image";
import { Swirlarrow } from "@/icons/icons";

const Index = () => {
  const [colorCode, setColorCode] = useState("#FFB900");

  const { data, refetch, isFetching, isError, error } = useColorData(colorCode);

  function convertHexToRgba(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function validateColorCode(colorCode) {
    const color_code = colorCode.trim().toLowerCase();
    if (color_code.startsWith("#")) {
      // validate hex code. support 3 and 6 hex code
      if (
        /^#[0-9A-F]{6}$/i.test(color_code) ||
        /^#[0-9A-F]{3}$/i.test(color_code)
      ) {
        return true;
      }
    } else if (color_code.startsWith("rgb")) {
      // validate rgb code
      let splitCode = color_code.split(",");
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
    const color = strColor.trim().toLowerCase();
    var s = new Option().style;
    s.color = color;
    return s.color == color;
  }

  const isValidatedColor = validateColorCode(colorCode) || isColor(colorCode);

  const disable = !colorCode || isFetching || (colorCode && !isValidatedColor);

  const handleSubmit = async (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <main className="max-w-[1100px] mx-auto">
      <Head>
        <title>PaletteAI</title>
      </Head>
      <div className="min-h-[95vh] pt-[30px] ">
        <div className="text-center mb-8 px-10">
          <h1 className="text-[26px] font-bold mb-2 text-gray-600">
            Palette.<span className="text-[#10A37F]">AI</span>🎨
          </h1>
          <span className="flex justify-center">
            <Swirlarrow />
          </span>
          <p className="text-[34px] leading-[1.15] md:text-[42px] md:leading-[1.2] font-bold text-gray-700 font-sans">
            Create your own <br />{" "}
            <span className="text-[#10A37F]">AI generated</span> color palettes
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
              className="outline-none border-none h-full w-full bg-transparent placeholder:text-sm text-gray-700"
              value={colorCode}
              onChange={(e) => setColorCode(e.target.value)}
            />
          </div>
          <button
            className={`pushable w-full ${
              disable && "disable-cursor opacity-50"
            }`}
            disabled={disable}
          >
            <span className="front text-center">
              {isFetching ? (
                <BeatLoader
                  color={"#fff"}
                  loading={isFetching}
                  size={14}
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
            <div className="flex justify-center">
              <Image
                src="/cube-loader.svg"
                width={80}
                height={80}
                alt="loader"
              />
            </div>
          ) : isError ? (
            <>
              <Error error={error} refetch={refetch} />
            </>
          ) : (
            <ErrorHandler>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-8 overflow-hidden">
                {data?.map((color, i) => {
                  const convertToArr = color?.split(":");
                  const designName = convertToArr[0];
                  const paletteColor = convertToArr[1].split(" ")[1];
                  const paletteName = convertToArr[1]
                    .split(" ")[2]
                    .split("(")[1]
                    .split(")")[0];

                  return (
                    <div key={i} className="zzz p-4 bg-gray-50">
                      <div
                        className={`w-full min-h-[220px] pb-7 text-center md:pb-8 `}
                        style={{
                          background: `${paletteColor}`,
                          overflow: "hidden",
                        }}
                      ></div>
                      <div className="mt-3">
                        <p className="uppercase text-[12px] font-semibold mb-2 text-gray-700">
                          {designName}
                        </p>
                        <MyDialog
                          color={paletteColor}
                          rgb={convertHexToRgba(paletteColor)}
                          name={paletteName}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </ErrorHandler>
          )}
        </section>
      </div>

      {/* footer */}
      <footer className="">
        <div className="max-w-[1100px] mx-auto h-full flex items-center justify-between px-4 py-3">
          <p className="text-[12px] md:text-[15px]">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://qdus.netlify.app"
              target={"_blank"}
              rel="noopener noreferrer"
              className="text-[#334155] font-semibold"
            >
              Qudus A.
            </a>
          </p>
          <p className="flex items-center text-[12px] md:text-[15px]">
            Made with{" "}
            <span className="svg mx-1">
              <Love />
            </span>{" "}
            &&{" "}
            <a
              href="https://openai.com/"
              target={"_blank"}
              rel="noopener noreferrer"
              className="text-[#334155] font-semibold capitalize ml-1"
            >
              openAI
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
