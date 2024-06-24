import React from "react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import organizations from "@/data/data";
import { Badge } from "./ui/badge";
interface Contributor {
  rank: number;
  name: string;
  taskDone: number;
  Points: number;
  Earned: string;
}

export function SearchBar() {
  return (
    <div className="flex items-center space-x-2 px-4 border border-primary rounded">
      <Search className="text-primary" />
      <Input
        className="border-0 ring-0 focus-visible:ring-0 focus:ring-0 w-full focus-visible:border-0 focus-visible:ring-offset-0"
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
    Cell: (row: { cell: { value: React.ReactNode } }) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "UserName",
    accessor: "name",
    Cell: (row: { cell: { value: React.ReactNode } }) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Tasks Done",
    accessor: "taskDone",
    Cell: (row: { cell: { value: React.ReactNode } }) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Task Points",
    accessor: "Points",
    Cell: (row: { cell: { value: React.ReactNode } }) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Earned",
    accessor: "Earned",
    Cell: (row: { cell: { value: React.ReactNode } }) => {
      return <span className="lowercase">{row?.cell?.value}</span>;
    },
  },
];

const TopContributor: React.FC<{ data: Contributor[] }> = ({ data }) => {
  const columns = React.useMemo(() => COLUMNS, []);
  const dataMemo = React.useMemo(() => data, []);

  
  return (
    <>
      <div className="w-full p-6">
        <div className="flex gap-6 px-3 py-2 items-center justify-center">
          <p className="text-md">Top Contributor</p>
          <Badge className="  flex items-center justify-center bg-primary text-primary-foreground shrink-0 h-8 rounded-lg  w-24 border">
            All time
          </Badge>
          <SearchBar />
        </div>
        <Card x-chunk="dashboard-06-chunk-0" className="mt-4">
          <div
            className="table-container"
            style={{ maxHeight: "600px", overflowY: "auto" }}
          >
            <Table className="border rounded-lg shadow-lg w-full bg-secondary overflow-hidden">
              <TableHeader className="bg-secondary">
                <TableRow>
                  <TableHead className="hidden sm:table-cell">Rank</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Task Done
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Task Points
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Earned</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((product, index) => (
                  <TableRow
                    key={product.rank}
                    className={index % 2 === 0 ? "bg-white" : "bg-white"}
                  >
                    <TableCell className="hidden sm:table-cell">
                      {product.rank}
                    </TableCell>
                    <TableCell className="font-medium flex gap-2 items-center">
                      {" "}
                      <Image
                        alt="Product image"
                        className="rounded-full aspect-square object-cover"
                        height="36"
                        src="/av-5.png"
                        width="36"
                      />
                      {product.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.taskDone}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.Points}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.Earned}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <CardFooter>
            <div className="text-muted-foreground text-xs">
              Showing <strong>1-10</strong> of <strong>32</strong> Contributors
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default TopContributor;
