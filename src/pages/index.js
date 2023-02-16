import React, { useState } from "react";
import { useColorData } from "@/hooks/useColorData";
import { ClipLoader } from "react-spinners";
import ErrorHandler from "@/helper/ErrorHandler";
import { defaultData } from "@/data/defaultdata";
import { Search, View } from "@/icons/icons";
import MyDialog from "@/components/Modal";
import Head from "next/head";
import { Love } from "@/icons/icons";
import Link from "next/link";
import Error from "@/components/Error";
import Image from "next/image";

const Index = () => {
  const [colorCode, setColorCode] = useState("#FFFAEF");

  const { data, refetch, isFetching, isError, error } = useColorData(colorCode);

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

  console.log(isError);

  return (
    <main className="max-w-[1100px] mx-auto">
      <Head>
        <title>PaletteAI</title>
      </Head>
      {/* <div className="mb-8 pt-9 px-8 ">
        <Link href={"/"} className="flex justify-end items-center text-lg">
          Star{" "}
          <span className="text-[#FFB900] mx-1">
            <Star />
          </span>
          on Github
        </Link>
      </div> */}
      <div className="min-h-[95vh] pt-[70px] ">
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
            className={`pushable w-full ${
              disable && "disable-cursor opacity-50"
            }`}
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data?.map((color, i) => {
                  const convertToArr = color?.split(":");
                  const designName = convertToArr[0];
                  const paletteColor = convertToArr[1].split(" ")[1];
                  const paletteName = convertToArr[1]
                    .split(" ")[2]
                    .split("(")[1]
                    .split(")")[0];

                  return (
                    <div
                      key={i}
                      className={`color-card w-full min-h-[220px] pb-7 text-center md:pb-8`}
                      style={{
                        background: `${paletteColor}`,
                        overflow: "hidden",
                      }}
                    >
                      <div className="flex flex-col justify-end h-full">
                        <div className="color-card-text">
                          <p className="font-semibold text-sm uppercase mb-2">
                            {designName}
                          </p>
                          <MyDialog
                            color={paletteColor}
                            rgb={convertHexToRgba(paletteColor)}
                            name={paletteName}
                          />
                        </div>
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
        <div className="max-w-[1100px] mx-auto h-full flex items-center justify-between px-4">
          <p>
            © {new Date().getFullYear()}{" "}
            <a
              href="https://github.com/FesoQue"
              target={"_blank"}
              rel="noopener noreferrer"
              className="text-[#334155] font-semibold"
            >
              Qudus A.
            </a>
          </p>
          <p className="flex items-center">
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
