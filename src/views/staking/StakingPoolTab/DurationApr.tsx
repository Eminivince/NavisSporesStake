import React from "react";

export const DurationApr = ({ aprs, indexDuration, setIndexDuration }: any) => {
  return (
    <div className="flex gap-2 ">
      {aprs.map((e: any, index: number) => (
        <div
          key={index}
          className={`
            w-8 h-8 
            flex items-center justify-center 
            rounded-lg 
            border border-gray-200
            ${
              index + 1 === indexDuration
                ? "bg-blue-100 border-[#0B5CCA] text-black"
                : "bg-white text-gray-500"
            }
          `}
          onClick={(e) => {
            e.stopPropagation();
            setIndexDuration(index + 1);
          }}
        >
          {e.time}
        </div>
      ))}
    </div>
  );
};
