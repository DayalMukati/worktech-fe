import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

function TaskCardItem({ task }: any) {
  return (
    <Card className="hover:bg-secondary border-2 border-primary/20 transition-colors h-24 min-w-[345px] max-w-[400px] duration-300 cursor-pointer">
      <CardHeader>
        <div className="flex sm:flex-row flex-col justify-between items-end sm:items-center">
          <div className="flex items-center gap-4">
            <Image
              className="rounded w-16 h-16 object-cover"
              src="/logo-4.png"
              alt="Organization Logo"
              width={64}
              height={64}
            />
            <div>
              <CardTitle className=" text-wrap text-md overflow-hidden text-ellipsis ">
                {task.name.length > 25 ? task.name.substring(0, 25) + '...' : task.name}
              </CardTitle>
              <CardDescription className="text-wrap overflow-hidden text-ellipsis">
              { task.description.length > 50 ? task.description.substring(0, 50) + '...' : task.description}
              </CardDescription>
            </div>
          </div>
          <div>
            <Badge className="w-full text-center hover:text-white bg-secondary text-primary border border-primary">
              {task.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default TaskCardItem;
