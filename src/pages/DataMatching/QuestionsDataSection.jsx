import React from "react";

const QuestionsDataSection = ({
  csvCurrentData,
  csvData,
  templateHeaders,
  imageColName,
  currentFocusIndex,
  inputRefs,
  handleKeyDownJump,
  changeCurrentCsvDataHandler,
  imageFocusHandler,
}) => {
  return (
    <div className="w-full xl:w-2/3 xl:px-6 mx-auto text-white">
      <div className="my-4 w-full ">
        <label
          className="text-xl font-semibold ms-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="questions"
        >
          Questions:
        </label>
        <div
          className="flex overflow-auto max-h-[360px] mt-3 ms-2 xl:ms-2"
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="flex flex-wrap">
            {csvCurrentData &&
              Object.entries(csvCurrentData).map(([key, value], i) => {
                const csvHeader = csvData[0][key];
                const templateData = templateHeaders?.templetedata.find(
                  (data) => data.attribute === csvHeader
                );
                if (
                  templateData &&
                  templateData.fieldType === "questionsField" &&
                  key !== imageColName
                ) {
                  return (
                    <div key={i} className=" me-3 my-1 flex">
                      <label
                        htmlFor={`Quantity${i}`}
                        className="font-bold text-sm w-9 text-bold my-1"
                      >
                        {key}
                      </label>
                      <div className="flex rounded">
                        <input
                          type="text"
                          id={`Quantity${i}`}
                          className={`h-7 w-7 text-center text-black rounded text-sm ${
                            csvCurrentData[key] === "" ||
                            (csvCurrentData[key] &&
                              typeof csvCurrentData[key] === "string" &&
                              (csvCurrentData[key].includes(
                                templateHeaders?.patternDefinition
                              ) ||
                                csvCurrentData[key].includes(" ")))
                              ? "bg-red-500 text-white"
                              : "bg-white"
                          }
                              ${
                                i === currentFocusIndex
                                  ? "bg-yellow-300 text-black"
                                  : ""
                              }
                          `}
                          ref={(el) => (inputRefs.current[i] = el)}
                          value={csvCurrentData[key] || ""}
                          onKeyDown={(e) => handleKeyDownJump(e, i)}
                          placeholder={value}
                          onChange={(e) =>
                            changeCurrentCsvDataHandler(key, e.target.value)
                          }
                          onFocus={() => imageFocusHandler(key)}
                        />
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsDataSection;
