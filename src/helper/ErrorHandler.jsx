import { Envelope } from "@/icons/icons";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useColorData } from "@/hooks/useColorData";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="w-full text-center p-6 bg-white">
      <h1 className="text-2xl mb-6  text-rose-500">
        Something went wrong 😱: {error.messsage}
      </h1>
      <button
        onClick={resetErrorBoundary}
        className="bg-[#10a37f] text-white py-2 px-4 text-sm capitalize rounded border border-1 border-gray-400 font-semibold"
      >
        Try again
      </button>
      <p className="text-sm text-gray-400 my-3">OR</p>
      <a
        href="mailto:adefesoq@gmail.com"
        className="flex max-w-[250px] mx-auto item-center justify-center text-sm uppercase bg-white opacity-60 p-2 font-semibold rounded border border-1 border-gray-400"
      >
        <span className="mr-2">
          <Envelope />
        </span>{" "}
        notify me of this error
      </a>
    </div>
  );
}

const ErrorHandler = ({ children }) => {
  const { data, refetch } = useColorData("#FFFAEF");

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => refetch()}
      resetKeys={[data]}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorHandler;
