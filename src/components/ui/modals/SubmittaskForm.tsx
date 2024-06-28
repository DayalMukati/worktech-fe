"use client";
import React from "react";
import { Button } from "../button";
import { Input } from "../input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Icon,
  ShieldCheck,
  CircleCheck,
  Users,
  LeafyGreen,
  DraftingCompass,
} from "lucide-react";
import { Label } from "@radix-ui/react-label";
import Select, { components } from "react-select";
import { useMutation } from "@apollo/client";
import { CREATE_TASK_MUTATION } from "@/graphql/mutation";
import { useAppDispatch, useAppSelector } from "@/hooks/toolKitTyped";
import { selectLayout } from "@/store/layoutSlice";
import { space } from "postcss/lib/list";
import { getStatusNumber } from "@/lib/getStatusNumber";
import useSmartContract from "@/hooks/useSmartContract";
import { selectUserAuth } from "@/store/authSlice";
import Web3, { AbiItem } from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/sc-constants";
import useWeb3 from "@/hooks/useWeb3";

// Define the schema using Zod
const createTaskSchema = z.object({
  taskName: z.string().min(2, "Task Name is required"),
  description: z.string().min(2, "Description is required"),
  acceptanceCriteria: z.string().min(2, "Acceptance Criteria is required"),
  status: z.number().min(1, "Status is required"),
  assignee: z.array(z.string()).min(1, "Assignee is required"),
  priority: z.string().min(1, "Priority is required"),
  reviewer: z.string().min(1, "Reviewers is required"),
  price: z.string().min(1, "Price is required"),
  skills: z.array(z.string()).min(1, "Skills is required"),
});

type Schema = z.infer<typeof createTaskSchema>;

const status = [
  { value: 0, label: "open", icon: <CircleCheck /> },
  { value: 1, label: "to-do", icon: <CircleCheck /> },
  { value: 2, label: "in-progress", icon: <CircleCheck /> },
  { value: 3, label: "in-review", icon: <CircleCheck /> },
  { value: 4, label: "done", icon: <CircleCheck /> },
  { value: 5, label: "backlog", icon: <CircleCheck /> },
];

const customOption = (props: any) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center">
        {props.data.icon}
        <span className="ml-2">{props.data.label}</span>
      </div>
    </components.Option>
  );
};

const customSingleValue = (props: any) => {
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center">
        {props.data.icon}
        <span className="ml-2">{props.data.label}</span>
      </div>
    </components.SingleValue>
  );
};

const customOptionAssignee = (props: any) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center">
        {props.data.icon}
        <span className="ml-2">{props.data.label}</span>
      </div>
    </components.Option>
  );
};
const customSingleValueAssignee = (props: any) => {
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center">
        {props.data.icon}
        <span className="ml-2">{props.data.label}</span>
      </div>
    </components.SingleValue>
  );
};

const Priority = [
  { value: "high", label: "high", color: "red" },
  { value: "medium", label: "medium", color: "yellow" },
  { value: "low", label: "low", color: "green" },
];

const customPriorityOption = (props: any) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center">
        <span
          className={`mr-2 h-2 w-2 rounded-full bg-${props.data.color}-500`}
        />
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );
};

const customPrioritySingleValue = (props: any) => {
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center">
        <span
          className={`mr-2 h-2 w-2 rounded-full bg-${props.data.color}-500`}
        />
        <span>{props.data.label}</span>
      </div>
    </components.SingleValue>
  );
};

const Reviewers = [
  { value: "ak@gmail.com", label: "Ak-8968" },
  { value: "dn@gmail.com", label: "DM-477" },
  { value: "vineet@gmail.com", label: "Vk-123" },
];

const SubmitTaskForm = ({
  taskId,
  handlePostSubmit,
}: {
  taskId: string;
  handlePostSubmit: Function;
}) => {
  const [createTaskMutaion] = useMutation(CREATE_TASK_MUTATION);
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(createTaskSchema),
  });

  // const { web3, walletAddress } = useAppSelector(selectUserAuth);
  const { connectToMetaMask, callSCMethod, active } = useWeb3();

  const { web3 } = useAppSelector(selectUserAuth);

  const { callMethod, account } = useSmartContract();

  const onSubmitFrom = async (data: Schema) => {
    try {
      if (!active) {
        await connectToMetaMask();
      }

      const priceInWei = Web3.utils.toWei(data.price, "ether");
    } catch (error) {
      console.log("error->", error);
    }
  };

  const onerror = (err: any) => {
    console.log("err->", err);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmitFrom, onerror)}>
      <div className="gap-6 grid grid-cols-3 p-4">
        <div className="col-span-2">
          <Label className="text-md text-slate-800">Paste link</Label>
          <Input
            type="link"
            {...register("taskName")}
            placeholder="Task Name"
            className="w-[400px] text-sm focus-visible:ring-0 focus:ring-0 border-2 border-slate-400 rounded-md text-slate-600"
          />
          {errors.taskName && (
            <span className="text-red-500 text-xs">
              {errors.taskName.message}
            </span>
          )}

          <Button
            type="submit"
            className="block bg-[#7D6CE2FF] mt-4 w-full text-center"
          >
            Create
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SubmitTaskForm;
