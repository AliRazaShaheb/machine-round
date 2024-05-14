import React, { useEffect, useRef, useState } from "react";
import { selectRandomColor } from "../utils/helpers";
import { colors } from "../utils/configs";

export const MultiSelectDropdown = () => {
  const [term, setTerm] = useState("");
  const [selectedData, set_selectedData] = useState([]);
  const [suggestion, set_suggestion] = useState([]);
  const ref = useRef();

  const focusInput = () => ref.current.focus();
  useEffect(() => {
    focusInput();
  }, []);

  useEffect(() => {
    if (term.trim() !== "") {
      fetch("https://dummyjson.com/users/search?q=" + term)
        .then((res) => res.json())
        .then((data) => {
          set_suggestion(data.users);
        });
    }
  }, [term]);

  const handleTermChange = (e) => {
    const { name, value } = e.target;
    setTerm(value);
  };

  const removeSelected = (id) => {
    const _selectedData = selectedData.filter((each) => each.id !== id);
    set_selectedData(_selectedData);
  };

  return (
    <>
      <div className="ring ring-blue-500 p-1 flex justify-start items-center gap-2">
        <div className="flex gap-2 flex-wrap">
          {selectedData.map((eachSelectedData, selectedDataIndex) => {
            return (
              <div
                key={`selectedData-${selectedDataIndex}`}
                style={{
                  backgroundColor: eachSelectedData.color,
                }}
                className={`py-1 px-2 rounded-lg text-white flex justify-between items-center gap-2`}
              >
                <span>{`${eachSelectedData.firstName} ${eachSelectedData.lastName}`}</span>
                <span
                  onClick={() => {
                    removeSelected(eachSelectedData.id);
                  }}
                  className="cursor-pointer"
                >
                  &#10005;
                </span>
              </div>
            );
          })}
          <div className="relative">
            <input
              type="text"
              className="bg-transparent outline-none"
              value={term}
              onChange={handleTermChange}
              ref={ref}
            />
            <div className="absolute top-full">
              {suggestion.length ? (
                <ul className="fixed  h-[20rem] bg-red-50 w-full max-w-[20rem] overflow-auto transition-all">
                  {suggestion.map((each, suggestionIdx) => {
                    return (
                      <li
                        key={`suggestion-${suggestionIdx}`}
                        className="hover:bg-red-300 cursor-pointer"
                        onClick={() => {
                          const color = selectRandomColor(colors);

                          set_selectedData((prev) => {
                            return [...prev, { ...each, color }];
                          });
                          setTerm("");
                          set_suggestion([]);
                          focusInput();
                        }}
                      >{`${each.firstName} ${each.lastName}`}</li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
