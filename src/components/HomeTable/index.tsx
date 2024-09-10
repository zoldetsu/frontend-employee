import React from "react";

export default function HomeTable() {
  return (
    <>
      <div className="flex justify-between bg-gray-800/60 w-full p-6  rounded-lg">
        <div className=" w-full">
          {" "}
          <div className="flex items-center">
            <div className=" w-6 h-px rotate-90 bg-white/20 "></div>
            <h3 className="text-white font-medium">Имя</h3>
          </div>
        </div>
        <div className=" w-full">
          {" "}
          <div className="flex items-center">
            <div className=" w-6 h-px rotate-90 bg-white/20 "></div>
            <h3 className="text-white font-medium">Возраст</h3>
          </div>
        </div>
        <div className=" w-full">
          <div className="flex items-center">
            <div className=" w-6 h-px rotate-90 bg-white/20 "></div>
            <h3 className="text-white font-medium">Адрес</h3>
          </div>
        </div>
      </div>
    </>
  );
}
