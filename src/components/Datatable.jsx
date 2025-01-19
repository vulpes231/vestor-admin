import React from "react";

const Datatable = ({ headers, data, rowKey }) => {
  return (
    <div className={`overflow-auto `}>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-black text-slate-100 capitalize">
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
                {headers.map((header) => (
                  <td key={header.id} className="px-6 py-2.5">
                    {row[header.id] || "-"}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable;
