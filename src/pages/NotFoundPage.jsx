import { Link } from "react-router-dom"; // Use this if you're using React Router

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] bg-gray-100">
      <h1 className="font-bold text-blue-600 text-9xl">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Oops! Page not found.
      </h2>
      <p className="mt-2 text-gray-600">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link to="/" className="px-4 py-2 mt-6 text-white transition bg-blue-500 rounded-md hover:bg-blue-600">
        Go back to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
