import React, { useState, useEffect } from 'react';
import { MdFilterList, MdDelete } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";

const Header = ({ onSearch }) => {
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Activity');
  const [selectedSort, setSelectedSort] = useState('Desc');
  const [selectQuestion, setQuestion] = useState("");

  const filterOptions = ['Activity', 'Votes', 'Creation', 'Relevance'];
  const sortOptions = ['Asc', 'Desc'];

  const resetFilter = () => setSelectedFilter(null);
  const resetSort = () => setSelectedSort(null);

  const handleSearch = () => {
    const formattedQuestion = `"${selectQuestion}"`;
    onSearch(formattedQuestion, selectedFilter, selectedSort); // Pass search inputs to parent function
  };

  // Trigger search whenever filter or sort options change
  useEffect(() => {
    handleSearch();
  }, [selectedFilter, selectedSort]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
      {/* Search Input */}
      <div className="flex items-center w-full space-x-3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectQuestion}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          onClick={handleSearch}
        >
          <IoMdSearch size={20} />
        </button>
      </div>

      {/* Filter and Sort Section */}
      <div className="flex flex-col mt-4 w-full space-y-4">
        <div className="flex items-center">
          {/* Display selected filter */}
          {selectedFilter && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Filter: {selectedFilter}</span>
              <MdDelete
                className="text-gray-500 cursor-pointer"
                size={20}
                onClick={() => {
                  resetFilter();
                  setSelectedFilter('Activity'); // Default back to 'Activity'
                }}
              />
            </div>
          )}
          {/* Filter Button */}
          <div className="relative ml-auto">
            <button
              className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              onClick={() => setShowFilterOptions(!showFilterOptions)}
            >
              <MdFilterList size={20} />
              <span className="ml-2">Filter</span>
            </button>
            {showFilterOptions && (
              <ul className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                {filterOptions.map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedFilter(option);
                      setShowFilterOptions(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex items-center">
          {/* Display selected sort */}
          {selectedSort && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Sort: {selectedSort}</span>
              <MdDelete
                className="text-gray-500 cursor-pointer"
                size={20}
                onClick={() => {
                  resetSort();
                  setSelectedSort('Desc'); // Default back to 'Desc'
                }}
              />
            </div>
          )}
          {/* Sort By Button */}
          <div className="relative ml-auto">
            <button
              className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              onClick={() => setShowSortOptions(!showSortOptions)}
            >
              <MdFilterList size={20} />
              <span className="ml-2">Sort By</span>
            </button>
            {showSortOptions && (
              <ul className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                {sortOptions.map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedSort(option);
                      setShowSortOptions(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

