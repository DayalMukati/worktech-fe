import React from "react";

interface SkeletonTableProps {
  items?: any[];
  count: number;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({ items, count }) => {
  items = items || Array.from({ length: count });
  return (
    <div className="w-full bg-slate-200 dark:bg-slate-700 shadow-lg border p-6 rounded-md m-2">
      <table className="animate-pulse w-full border-separate border-spacing-4 table-fixed">
        <thead>
          <tr>
            <th scope="col">
              <div className="h-4 bg-slate-300 dark:bg-slate-500"></div>
            </th>
            <th scope="col">
              <div className="h-4 bg-slate-300 dark:bg-slate-500"></div>
            </th>
            <th scope="col">
              <div className="h-4 bg-slate-300 dark:bg-slate-500"></div>
            </th>
            <th scope="col">
              <div className="h-4 bg-slate-300 dark:bg-slate-500"></div>
            </th>
            <th scope="col">
              <div className="h-4 bg-slate-300 dark:bg-slate-500"></div>
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {items.map((item, i) => (
            <tr key={i}>
              <td>
                <div className="h-2 bg-slate-300 dark:bg-slate-500"></div>
              </td>
              <td>
                <div className="h-2 bg-slate-300 dark:bg-slate-500"></div>
              </td>
              <td>
                <div className="h-2 bg-slate-300 dark:bg-slate-500"></div>
              </td>
              <td>
                <div className="h-2 bg-slate-300 dark:bg-slate-500"></div>
              </td>
              <td>
                <div className="h-2 bg-slate-300 dark:bg-slate-500"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
