
import { Link, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <div className='alignment mt-24 flex flex-col gap-2 justify-center items-center'>
        <h1 className='text-center'>Page not found</h1>
        <p className='text-center'>
          We could not find the page you are looking for.
        </p>
        <div className='mt-8 mx-auto'>
          <Link to='/' className='btn'>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='alignment mt-24 flex flex-col gap-2 justify-center items-center'>
      <h2 className='text-center'>{error.status}</h2>
      <div className='mt-8 mx-auto'>
          <Link to='/' className='btn'>
            Back to Home
          </Link>
        </div>
    </div>
  );
}

export default Error;
