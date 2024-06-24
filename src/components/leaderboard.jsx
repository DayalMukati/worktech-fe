import React from "react";
import TopContributor from "./TopContributors";
import TopReviewer from "./TopReviewer";
import { MailWarningIcon } from "lucide-react";

function Leaderboard() {
  return (
    <>
   <div className="flex gap-4 justify-start mt-4 mb-10" >
  <div className="flex w-full  items-center">
    <TopContributor />
  </div>
  <div className="flex w-full items-center">
    <TopReviewer />
  </div>
</div>
    </>
  );
}

export default Leaderboard;
