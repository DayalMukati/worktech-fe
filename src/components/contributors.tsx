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
  userID?: { _id: string 
    email : string
  };
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
const ContributorCard: React.FC<any> = ({ contributor }) => {
  // console.log("contributor", contributor);
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
                <p>{contributor?.email as string}</p>
              </CardTitle>
              <span className="flex space-x-2">
                {contributor?.skills.map((skill: any, index: any) => {
                  // console.log("skill", skill);
                  return (
                    <Badge
                      key={index}
                      className="hover:text-white text-center bg-secondary text-primary border border-primary"
                    >
                      {skill?.title === "Javascript"
                        ? "JS"
                        : skill?.title === "MERN Stack"
                        ? "MERN"
                        : skill?.title === "react"
                        ? "REACT"
                        : skill?.title === "tailwind"
                        ? "TAILWIND"
                        : skill?.title === "html"
                        ? "HTML"
                        : skill?.title === "css"
                        ? "CSS"
                        : skill?.title === "nodejs"
                        ? "NODEJS"
                        : skill?.title === "mongodb"
                        ? "MONGODB"
                        : skill?.title === "graphql"
                        ? "GRAPHQL"
                        : skill?.title === "typescript"
                        ? "TYPESCRIPT"
                        : skill?.title === "nextjs"
                        ? "NEXTJS"
                        : skill?.title === "firebase"
                        ? "FIREBASE"
                        : skill?.title === "aws"
                        ? "AWS"
                        : skill?.title === "git"
                        ? "GIT"
                        : skill?.title}
                    </Badge>
                  );
                })}{" "}
                <Badge className="hover:text-white text-center bg-secondary text-primary border border-primary">
                  {contributor.reputation || Math.floor(Math.random() * 1000)}
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
  const [contributors, setContributors] = useState<Contributor[]>([]);

  const { data, loading, error } = useQuery<UserData>(GET_USERS_QUERY, {
    onCompleted: (data) => {
      console.log("data contrubuter", data);
      setContributors(data.users as any);
    },
  });

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
