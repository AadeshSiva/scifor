import React from "react";

interface BackPopupProps {
  onSave: () => void;
  onDontSave: () => void;
  onCancel: () => void;
}

const BackPopup: React.FC<BackPopupProps> = ({ onSave, onDontSave, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
    <div className="w-full max-w-md bg-gray-100 p-6 flex flex-col space-y-6 rounded-lg shadow-xl">
      <div className="text-center space-y-3">
        <h1 className="text-xl font-semibold text-gray-800">You have unsaved changes.</h1>
        <h1 className="text-xl font-semibold text-gray-800">Do you want to save them</h1>
        <h1 className="text-xl font-semibold text-gray-800">before leaving?</h1>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
        <button
          className="rounded-lg bg-blue-600 text-white px-5 py-2.5 hover:bg-blue-700"
          onClick={onSave}
        >
          Save
        </button>
        <button
          className="rounded-lg bg-gray-600 text-white px-5 py-2.5 hover:bg-gray-700"
          onClick={onDontSave}
        >
          Don't Save
        </button>
        <button
          className="rounded-lg bg-red-600 text-white px-5 py-2.5 hover:bg-red-700"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default BackPopup;
