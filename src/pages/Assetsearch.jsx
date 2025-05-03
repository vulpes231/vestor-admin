/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { MdSearch, MdClose } from "react-icons/md";

const Assetsearch = ({ myAssets, searchAsset, setSearchAsset, setSymbol }) => {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchAsset.trim() === "") {
      setResults([]);
      setShowResults(false);
      return;
    }

    const filtered = myAssets.filter((ast) =>
      ast.name.toLowerCase().includes(searchAsset.toLowerCase())
    );
    setResults(filtered);
    setShowResults(filtered.length > 0);
  }, [searchAsset, myAssets]);

  const handleSelect = (asset) => {
    setSearchAsset(asset.name);
    setSymbol(asset.symbol);
  };

  const handleClear = () => {
    setSearchAsset("");
    setSymbol("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="relative">
      <div className="flex flex-col">
        <label htmlFor="" className="text-[14px] text-[#979797] font-normal">
          Search Assets
        </label>
        <span className="relative border-[#979797] border-[1px] h-[38px] rounded-[5px]">
          <input
            type="text"
            placeholder="search asset by name"
            className="outline-none p-2 bg-transparent w-full"
            value={searchAsset}
            onChange={(e) => {
              setSearchAsset(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => searchAsset && setShowResults(true)}
            name="searchAsset"
          />
          {searchAsset ? (
            <MdClose
              className="absolute top-[8px] right-[5px] w-[20px] h-[20px] text-[#979797] cursor-pointer"
              onClick={handleClear}
            />
          ) : (
            <MdSearch className="absolute top-[8px] right-[5px] w-[20px] h-[20px] text-[#979797]" />
          )}
        </span>
      </div>

      {showResults && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {results.map((asset) => (
            <div
              key={asset.id || asset.name}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => {
                handleSelect(asset);
                setResults([]);
                setShowResults(false);
              }}
            >
              <img src={asset.img} alt="" className="w-[20px]" />
              <h6> {asset.name}</h6>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assetsearch;
