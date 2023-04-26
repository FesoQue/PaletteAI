function Error({ statusCode }) {
  return (
    <div className="h-screen grid place-items-center">
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server, pls wait while we look into it! 😱`
          : "An error occurred on client, pls wait while we look into it! 😱"}
      </p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
