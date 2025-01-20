/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Datatable = ({ headers, data, rowKey }) => {
  return (
    <div className={`overflow-auto `}>
      <table className="min-w-full bg-white">
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
          {data &&
            data.map((row, index) => (
              <tr key={rowKey ? row[rowKey] : index} className="border-t">
                {headers.map((header) => {
                  // console.log(header);
                  return (
                    <td key={header.id} className="px-6 py-2.5 text-sm">
                      <span
                        className={`${
                          row[header.id] === "complete"
                            ? "bg-green-200 px-5 py-1.5 text-green-500 rounded-3xl "
                            : row[header.id] === "incomplete"
                            ? "bg-red-200 px-5 py-1.5 text-red-500 rounded-3xl "
                            : null
                        } ${header.id === "coin" && "uppercase"} `}
                      >
                        {row[header.id] || "-"}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable;
