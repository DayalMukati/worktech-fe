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
import { Textarea } from "@headlessui/react";
import { Label } from "@radix-ui/react-label";
import Select, { components } from "react-select";
import { useMutation } from "@apollo/client";
import { CREATE_TASK_MUTATION } from "@/graphql/mutation";
import { useAppDispatch, useAppSelector } from "@/hooks/toolKitTyped";
import { selectLayout } from "@/store/layoutSlice";
import { space } from "postcss/lib/list";
import { getStatusNumber } from "@/lib/getStatusNumber";
import useSmartContract from '@/hooks/useSmartContract';
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

const Assignee = [
  {
    value: "6672dba833963a34ca6b6b9d",
    label: "ak@gmail.com",
    icon: <Users className="w-4 h-4" />,
  },
  {
    value: "6672dba833963a34ca6b6b9d",
    label: "dayal@gmail.com",
    icon: <Users className="w-4 h-4" />,
  },
  {
    value: "6672dba833963a34ca6b6b9d",
    label: "vineet@gmail.com",
    icon: <Users className="w-4 h-4" />,
  },
];

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
  { value: "low", label: "low", color: "green" },
  { value: "medium", label: "medium", color: "yellow" },
  { value: "high", label: "high", color: "red" },
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

const CreateTaskForm = ({
  spaceId,
  handlePostSubmit,
  column,
}: {
  spaceId: string;
  handlePostSubmit: Function;
  column: string;
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

  const { web3, walletAddress } = useAppSelector(selectUserAuth);
	const { connectToMetaMask , callSCMethod, active} = useWeb3();

  const { callMethod, account } = useSmartContract();

  const onSubmitFrom = async (data: Schema) => {
    try {
      
      if (!active) {
        await connectToMetaMask();
      }

      const priceInWei = Web3.utils.toWei(data.price, 'ether');

      console.log('+++++',data.price, [data.taskName, priceInWei, '0x6880c2B6d2C95003d9C73764F0855d41e9C967Bd']);
      await createTaskMutaion({
        variables: {
          input: {
            space: spaceId,
            name: data.taskName,
            description: data.description,
            priority: data.priority,
            amount: data.price,
            activities: [],
            reviewer: data.reviewer,
            assinees: [],
            skills: [],
            acceptanceCriteria: data.acceptanceCriteria,
            status: data.status,
          },
        },
        onError(error: any): never {
          throw new Error(error);
        },
        onCompleted: async (res: any) => {
          let txn = await callSCMethod([data.taskName, priceInWei, '0x6880c2B6d2C95003d9C73764F0855d41e9C967Bd']);
          console.log("data->", txn);
      
          handlePostSubmit(res);
        }
      });
    } catch (error) {
      console.log("error->", error);
    }
  };

  const onerror = (err: any) => {
    console.log("err->", err);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmitFrom, onerror)}>
      <div className="grid grid-cols-3 gap-6 p-4">
        <div className="col-span-2 ">
          <Label className="text-md text-slate-800">Task Name</Label>
          <Input
            type="text"
            {...register("taskName")}
            placeholder="Task Name"
            className="w-[400px] text-sm  text-slate-600 border-slate-400 border-2 rounded-md "
          />
          {errors.taskName && (
            <span className="text-red-500 text-xs">
              {errors.taskName.message}
            </span>
          )}
          <div className="flex gap-4 mt-4 ">
            <Button className="bg-[#7D6CE2FF] text-center gap-3">
              <ShieldCheck className="w-4 h-4 " />
              Permissions
            </Button>
            <Button className="bg-[#7D6CE2FF] text-center gap-3">
              <DraftingCompass className="w-4 h-4 " />
              Add Skils
            </Button>
          </div>
          <div className="mt-4">
            <Label className="text-md text-slate-800">Task Description</Label>
            <Textarea
              placeholder="Task Description "
              {...register("description")}
              onChange={(e) => {
                clearErrors(["description"]);
              }}
              name="description"
              className="w-full  h-[80px] outline-none text-sm font-sm text-slate-600  border-2 rounded-md border-slate-400 indent-2"
            />
            {errors.description && (
              <span className="text-red-500 text-xs">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="mt-4">
            <Label className="text-md text-slate-800 mt-4">
              Accepted Criteria
            </Label>
            <Textarea
              {...register("acceptanceCriteria")}
              placeholder="Acceptace criteria"
              className="w-full   outline-none text-sm font-sm text-slate-600  border-2 border-slate-400  rounded-md indent-2"
            />
            {errors.acceptanceCriteria && (
              <span className="text-red-500 text-xs">
                {errors.acceptanceCriteria.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="block w-full bg-[#7D6CE2FF] text-center mt-4 "
          >
            Create
          </Button>
        </div>

        <div>
          <div className="flex flex-col justify-between items-center gap-4">
            <div className="text-sm text-slate-900 uppercase w-full ">
              <Label className="text-sm text-slate-800 "> Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    options={status}
                    defaultValue={status.find(
                      (status) => status.value === getStatusNumber(column)
                    )}
                    onChange={(selectedOption) => {
                      field.onChange(
                        selectedOption ? selectedOption.value : null
                      );
                      clearErrors("status"); // Clear error on change
                    }}
                    components={{
                      Option: customOption,
                      SingleValue: customSingleValue,
                    }}
                  />
                )}
              />
              {errors.status && (
                <span className="text-red-500 text-xs">
                  {errors.status.message}
                </span>
              )}
            </div>

            <div className="text-sm text-slate-900 uppercase w-full">
              <Label className="text-sm text-slate-800 "> Assignee</Label>
              <Controller
                name="assignee"
                control={control}
                render={({ field }) => (
                  <Select
                    options={Assignee}
                    isMulti
                    onChange={(selectedOptions) => {
                      const values = selectedOptions
                        ? selectedOptions.map((option) => option.value)
                        : [];
                      field.onChange(values);
                      clearErrors("assignee"); // Clear error on change
                    }}
                    components={{
                      Option: customOptionAssignee,
                      SingleValue: customSingleValueAssignee,
                    }}
                  />
                )}
              />
              {errors.assignee && (
                <span className="text-red-500 text-xs">
                  {errors.assignee.message}
                </span>
              )}
            </div>

            <div className="text-sm text-slate-900 uppercase w-full">
              <Label className="text-sm text-slate-800 "> Priority</Label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select
                    options={Priority}
                    onChange={(selectedOption) => {
                      field.onChange(
                        selectedOption ? selectedOption.value : null
                      );
                      clearErrors("priority"); // Clear error on change
                    }}
                    components={{
                      Option: customPriorityOption,
                      SingleValue: customPrioritySingleValue,
                    }}
                  />
                )}
              />
              {errors.priority && (
                <span className="text-red-500 text-xs">
                  {errors.priority.message}
                </span>
              )}
            </div>
          </div>

          <div className="text-sm mt-2 text-slate-900 uppercase w-full">
            <Label className="uppercase">HBAR-Price</Label>
            <Input
              type="text"
              placeholder="Price"
              {...register("price")}
              onChange={(e) => {
                clearErrors(["price"]);
              }}
            />
            {errors.price && (
              <span className="text-red-500 text-xs">
                {errors.price.message}
              </span>
            )}
          </div>

          <div className="text-sm mt-2 text-slate-900 uppercase w-full">
            <Label className="text-sm text-slate-800 "> Reviewer</Label>
            <Controller
              name="reviewer"
              control={control}
              render={({ field }) => (
                <Select
                  options={Reviewers}
                  onChange={(selectedOption) => {
                    field.onChange(
                      selectedOption ? selectedOption.value : null
                    );
                    clearErrors("reviewer"); // Clear error on change
                  }}
                />
              )}
            />
            {errors.reviewer && (
              <span className="text-red-500 text-xs">
                {errors.reviewer.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateTaskForm;
