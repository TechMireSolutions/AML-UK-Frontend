const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 sm:p-8 text-center max-w-sm w-full mx-4">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-4 border-blue-600 mx-auto"></div>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default Loading;