'use client'
import { useState } from 'react';

interface Props {
  setView: (view: string) => void;
}

const ViewDropdown = ({ setView }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleViewChange = (view: string) => {
    setView(view);
    setIsOpen(false); // Close the dropdown after selecting a view
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          Select View
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.7.3l7 7a1 1 0 01-1.4 1.4L10 5.4l-6.3 6.3a1 1 0 01-1.4-1.4l7-7A1 1 0 0110 3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <button
              className="text-gray-700 block px-4 py-2 text-sm w-full text-left"
              role="menuitem"
              onClick={() => handleViewChange('percentage_sales')}
            >
              Percentage Sales
            </button>
            <button
              className="text-gray-700 block px-4 py-2 text-sm w-full text-left"
              role="menuitem"
              onClick={() => handleViewChange('another_view')}
            >
              Another View
            </button>
            {/* Add more buttons for other views as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDropdown;
