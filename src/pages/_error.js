import { Envelope } from "@/icons/icons";

function Error({ statusCode }) {
  return (
    <div className="h-screen grid place-items-center px-5 text-center">
      <p className="mb-5">
        {statusCode
          ? `An error ${statusCode} occurred on server, pls wait while we look into it! 😱`
          : "Somethin went wwrong, please wait while we look into it! 😱"}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-red-600 text-white py-2 px-4 text-sm capitalize rounded border border-1 border-gray-400 font-semibold"
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

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
