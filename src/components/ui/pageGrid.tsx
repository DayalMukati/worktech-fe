import React from "react";

const PageGrid = () => {
  return (
    <div className="px-12 py-8 animate-pulse ">
    <div className="p-4 max-w-8xl mx-auto  border shadow-lg rounded-lg ">
      <div className="flex justify-between items-start ">
        <div className="flex items-center space-x-4 ">
          <div className="bg-slate-200 h-16 w-16 rounded-full"></div>
          <div>
            <div className="bg-slate-200 h-6 w-48 rounded"></div>
            <div className="bg-slate-200 h-4 w-32 rounded mt-2"></div>
            <div className="bg-slate-200 h-4 w-40 rounded mt-1"></div>
          </div>
        </div>
        <div className="bg-slate-200 h-10 w-24 rounded"></div>
      </div>
      <div className="mt-8">
        <div className="bg-slate-200 h-6 w-24 rounded"></div>
        <div className="flex space-x-4 mt-4">
          <div className="bg-slate-200 h-24 w-48 rounded"></div>
          <div className="bg-slate-200 h-24 w-48 rounded"></div>
        </div>
      </div>
      <div className="mt-8">
        <div className="bg-slate-200 h-6 w-24 rounded"></div>
        <div className="space-y-4 mt-4">
          <div className="bg-slate-200 h-10 w-full rounded"></div>
          <div className="bg-slate-200 h-10 w-full rounded"></div>
          <div className="bg-slate-200 h-10 w-full rounded"></div>
          <div className="bg-slate-200 h-10 w-full rounded"></div>
        </div>
      </div>
      <div className="mt-8 flex space-x-8">
        <div className="flex-1">
          <div className="bg-slate-200 h-6 w-24 rounded"></div>
          <div className="space-y-4 mt-4">
            <div className="bg-slate-200 h-10 w-full rounded"></div>
            <div className="bg-slate-200 h-10 w-full rounded"></div>
          </div>
        </div>
        <div className="w-64">
          <div className="bg-slate-200 h-6 w-24 rounded"></div>
          <div className="space-y-4 mt-4">
            <div className="bg-slate-200 h-10 w-full rounded"></div>
            <div className="bg-slate-200 h-10 w-full rounded"></div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PageGrid;
