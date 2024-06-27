import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { LIST_ALL_INTERESTED_CONTRIBUTORS } from "@/graphql/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

// Define the type for a contributor
interface Contributor {
  name: string;
  reputation: number;
  description: string;
  avatar: string;
}

// Define the type for the query data
interface QueryData {
  listAllInterestedContributors: Contributor[];
}

// SearchBar component
export function SearchBar(): JSX.Element {
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

// ContributorCard component
interface ContributorCardProps {
  contributor: Contributor;
}

const ContributorCard: React.FC<ContributorCardProps> = ({ contributor }) => {
  return (
    <Card className="hover:bg-secondary transition-colors border-2 border-primary/40 duration-300 cursor-pointer h-40">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center ">
          <div className="flex items-center gap-4">
            <Image
              className="w-14 h-14 border object-cover rounded-full p-1"
              src='/av-7.png'
              alt="Avatar"
              width={64}
              height={64}
            />
            <div>
              <p className="text-xl">
				{contributor.name}</p>
              <span className="flex space-x-2">
                <p>Reputation:</p>
                <Badge className="hover:text-white text-center bg-secondary text-primary border border-primary">
                  {/* {contributor.reputation} */}
				  1001
                </Badge>
              </span>
            </div>
          </div>
        </div>
        <div>
          <CardDescription className="text-slate-500 mt-2">
            {contributor.description}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

// ContributorList component
const ContributorList: React.FC = () => {
  const { data, loading, error } = useQuery<QueryData>(LIST_ALL_INTERESTED_CONTRIBUTORS);
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    if (data) {
      setContributors(data.listAllInterestedContributors);
    }
  }, [data]);

  if (loading)
    return (
      <p className="flex justify-center items-center h-full">Loading...</p>
    );

  if (error)
    return (
      <p className="flex justify-center items-center h-full">
        Error: {error.message}
      </p>
    );

  return (
    <div className="w-full flex justify-center px-24">
      <div className="flex flex-col items-center p-6 space-y-4">
        <h1 className="text-4xl text-primary justify-start">
          Top Contributors
        </h1>

        <SearchBar />
        <div className="w-full grid grid-cols-3 gap-4">
          {contributors.map((contributor) => (
            <ContributorCard key={contributor.name} contributor={contributor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributorList;
