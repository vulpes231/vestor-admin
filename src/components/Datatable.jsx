/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

const Datatable = ({ headers, data, rowKey }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Calculate the total number of pages
  const totalPages = Math.ceil(data?.length / rowsPerPage);

  // Get the rows for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data && data.slice(indexOfFirstRow, indexOfLastRow);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={`overflow-auto`}>
      <table className="min-w-full bg-white border border-slate-300 rounded-[5px]">
        <thead>
          <tr className="bg-stone-900 text-slate-100 capitalize">
            {headers &&
              headers.map((hd) => (
                <th className="px-6 py-2.5 text-left" key={hd.id}>
                  {hd.name}
                </th>
              ))}
          </tr>
        </thead>

        <tbody>
          {currentRows &&
            currentRows.map((row, index) => (
              <tr
                key={rowKey ? row[rowKey] : index}
                className={index % 2 !== 0 ? "bg-slate-100" : ""}
              >
                {headers.map((header) => (
                  <td key={header.id} className="px-6 py-2.5 text-sm">
                    <span
                      className={`${
                        row[header.id] === "complete"
                          ? "bg-green-200 px-5 py-1.5 text-green-500 rounded-[5px]"
                          : row[header.id] === "incomplete"
                          ? "bg-red-200 px-5 py-1.5 text-red-500 rounded-[5px]"
                          : null
                      } ${header.id === "coin" && "uppercase"}`}
                    >
                      {header.id === "roi"
                        ? row[header.id] === 0
                          ? 0
                          : row[header.id]
                        : row[header.id] || "-"}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-gray-500 rounded"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-gray-500 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Datatable;
