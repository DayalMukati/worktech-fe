import React from "react";

const ErrorDisplay: React.FC<{ errorMessage: string }> = ({ errorMessage }) => {
  return (
    <div className="error-container shadow-lg bg-slate-50 border p-6 m-4 rounded-lg overflow-auto max-h-96">
      <h2 className="my-2">Error Message</h2>
      <pre className="border-red-600 border shadow-lg rounded-lg bg-slate-100 p-2 ">{errorMessage}</pre>
    </div>
  );
};

export default ErrorDisplay;
