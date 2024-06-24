import React from "react";
import TopContributor from "./TopContributors";
import TopReviewer from "./TopReviewer";
import { MailWarningIcon } from "lucide-react";
import { data1 } from '@/data/data';
import { data2 } from '@/data/data';
function Leaderboard() {
  return (
    <>
   <div className="flex gap-4 justify-start mt-4 mb-10" >
  <div className="flex w-full  items-center">
    <TopContributor data={data1} />
  </div>
  <div className="flex w-full items-center">
    <TopReviewer data={data2} />
  </div>
</div>
    </>
  );
}

export default Leaderboard;
