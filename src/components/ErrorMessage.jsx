const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded mb-6">
      <strong>Error:</strong> {message}
    </div>
  );
};

export default ErrorMessage;