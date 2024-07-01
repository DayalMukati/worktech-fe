"use client";
import React, { useState,useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Variable } from "lucide-react";
import { LIST_ALL_INTERESTED_CONTRIBUTORS, GET_USER_BY_TOKEN, GET_USERS_QUERY } from "@/graphql/queries";
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
 import ErrorDisplay from "@/components/ui/ErrorDisplay";
import SkeletonGrid from "./ui/SkeletionGrid";
// Import statements and other imports...

// Define the type for a contributor
interface Contributor {
  name: string;
  reputation: number;
  description: string;
  avatar: string;
  userID?: { _id: string };
}
interface ContributorCardProps {
  contributor: Contributor;
}

// Define the type for the query data
interface QueryData {
  listAllInterestedContributors: Contributor[];
}

// Define the type for user data
interface UserData {
  users: {
    _id: string;
    name: string;
    email: string;
  }[];
}

// SearchBar component
export function SearchBar(): JSX.Element {
  return (
    <div className="flex items-center space-x-2 px-4 w-full max-w-xl bg-secondary rounded-full border-2 border-slate-200">
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
const ContributorCard: React.FC<ContributorCardProps> = ({ contributor }) => {
  const { data: userData, loading: userLoading, error: userError } = useQuery<UserData>(
    GET_USERS_QUERY
  );

  if (userLoading) {
    return <SkeletonGrid />;
  }

  if (userError) {
    return <ErrorDisplay errorMessage={userError?.message || "Unknown error"} />;
  }

   const user = userData?.users.find(user => user._id === contributor.userID?._id);
    return (
    <Card className="hover:bg-secondary border-2 min-w-[350px] max-w-[400px] border-primary/20 transition-colors duration-300 cursor-pointer h-30">
      <CardHeader className="p-2">
        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center">
          <div className="flex items-center gap-4 w-full">
            <Image
              className="w-14 h-14 border object-cover rounded-full p-1"
              src={contributor.avatar || "/av-7.png"}
              alt="Avatar"
              width={64}
              height={64}
            />
            <div className="space-y-1">
              <CardTitle className="text-wrap text-md overflow-hidden text-ellipsis">
                {user && <p>{user.email}</p>}
              </CardTitle>
              <span className="flex space-x-2">
                <p>Reputation:</p>
                <Badge className="hover:text-white text-center bg-secondary text-primary border border-primary">
                  {contributor.reputation}
                </Badge>
              </span>
            </div>
          </div>
        </div>
        <div>
          <CardDescription className="text-slate-500 mx-2">
            {contributor.description?.length > 85
              ? contributor.description.substring(0, 85) + "..."
              : contributor.description}
          </CardDescription>
        </div>
      </CardHeader>
      
    </Card>
  );
};

// ContributorList component
const ContributorList: React.FC = () => {
  const { data, loading, error } = useQuery<QueryData>(
    LIST_ALL_INTERESTED_CONTRIBUTORS,
    {
      fetchPolicy: "cache-and-network",
      // Optional: You can handle onCompleted to set state if needed
    }
  );

  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    if (data?.listAllInterestedContributors) {
      setContributors(data.listAllInterestedContributors);
    }
  }, [data]);

  if (loading) {
    return <SkeletonGrid />;
  }

  if (error) {
    return <ErrorDisplay errorMessage={error?.message || "Unknown error"} />;
  }

  return (
    <div className="w-full flex justify-center px-24 py-6">
      <div className="flex flex-col items-center space-y-4">
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
