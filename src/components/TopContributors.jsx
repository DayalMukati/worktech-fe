import React from "react";
import { useTable } from "react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
 import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import organizations from "@/data/data";
import { Badge } from "./ui/badge";
export function SearchBar() {
  return (
    <div className="flex items-center space-x-2 px-4 border w-full max-w-xl bg-secondary rounded">
      <Search className="" />
      <Input
        className="border-0 ring-0 focus-visible:ring-0 focus:ring-0 w-full focus-visible:border-0 focus-visible:ring-offset-0 bg-secondary"
        type="text"
        placeholder="Search Contributors..."
      />
    </div>
  );
}
const COLUMNS = [
  {
    Header: "Rank",
    accessor: "rank",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "UserName",
    accessor: "name",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Tasks Done",
    accessor: "taskDone",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Task Points",
    accessor: "Points",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Earned",
    accessor: "Earned",
    Cell: (row) => {
      return <span className="lowercase">{row?.cell?.value}</span>;
    },
  },
];

const data = [
  {
    rank: 1,
    name: "John Doe",
    taskDone: 150,
    Points: 3000,
    Earned: "$1000",
  },
  {
    rank: 2,
    name: "Jane Smith",
    taskDone: 140,
    Points: 2800,
    Earned: "$900",
  },
  {
    rank: 3,
    name: "Alice Johnson",
    taskDone: 130,
    Points: 2600,
    Earned: "$850",
  },
  {
    rank: 4,
    name: "Bob Brown",
    taskDone: 120,
    Points: 2400,
    Earned: "$800",
  },
  {
    rank: 5,
    name: "Charlie Davis",
    taskDone: 110,
    Points: 2200,
    Earned: "$750",
  },
  {
    rank: 6,
    name: "Dana Evans",
    taskDone: 100,
    Points: 2000,
    Earned: "$700",
  },
  {
    rank: 7,
    name: "Ethan Foster",
    taskDone: 90,
    Points: 1800,
    Earned: "$650",
  },
  {
    rank: 8,
    name: "Fiona Green",
    taskDone: 80,
    Points: 1600,
    Earned: "$600",
  },
  {
    rank: 9,
    name: "George Harris",
    taskDone: 70,
    Points: 1400,
    Earned: "$550",
  },
  {
    rank: 10,
    name: "Hannah White",
    taskDone: 60,
    Points: 1200,
    Earned: "$500",
  },
];

const TopContributor = () => {
  const columns = React.useMemo(() => COLUMNS, []);
  const dataMemo = React.useMemo(() => data, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: dataMemo,
    });

  return (
    <>
     <div className='w-full'>
      <div className=' flex gap-6'>
        <p>Top Contributor</p>
        <Badge className="text-center bg-primary/60 text-primary-foreground shrink-0 border ">All time</Badge>
        <SearchBar />
      </div>
      <div className='gap-y-2 w-full mt-4'>
        <table
          {...getTableProps()}
          className=" bg-white rounded-lg shadow-lg overflow-hidden gap-2"
          style={{ padding: "2rem" }}
        >
          <thead style={{padding:"1rem"}}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        </div>
    </>
  );
};

export default TopContributor;
