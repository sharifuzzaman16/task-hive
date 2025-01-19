const Unauthorized = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized</h1>
          <p className="text-lg text-gray-700 mb-6">
            You do not have permission to access this page. Please contact the administrator if you believe this is a mistake.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-2 bg-bg-primary text-white text-lg font-semibold rounded-md"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  };
  
  export default Unauthorized;
  