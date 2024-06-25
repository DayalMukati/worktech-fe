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
} from "lucide-react";
import { Textarea } from "@headlessui/react";
import { Label } from "@radix-ui/react-label";
import Select, { components } from "react-select";

// Define the schema using Zod
const createTaskSchema = z.object({
  taskName: z.string().min(2, "Task Name is required"),
  description: z.string().min(2, "Description is required"),
  acceptanceCriteria: z.string().min(2, "Acceptance Criteria is required"),
  status: z.number().min(1, "Status is required"),
  assignee: z.array(z.string()).min(1, "Assignee is required"),
  priority: z.number().min(1, "Priority is required"),
  reviewers: z.array(z.string()).min(1, "Reviewers is required"),
  price: z.string().min(1, "Price is required"),
});

type Schema = z.infer<typeof createTaskSchema>;

const status = [
  { value: 1, label: "open", icon: <CircleCheck /> },
  { value: 2, label: "to-do", icon: <CircleCheck /> },
  { value: 3, label: "in-progress", icon: <CircleCheck /> },
  { value: 4, label: "completed", icon: <CircleCheck /> },
  { value: 5, label: "cancelled", icon: <CircleCheck /> },
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
    value: "ak@gmail.com",
    label: "ak@gmail.com",
    icon: <Users className="w-4 h-4" />,
  },
  {
    value: "dn@gmail.com",
    label: "dayal@gmail.com",
    icon: <Users className="w-4 h-4" />,
  },
  {
    value: "vineet@gmail.com",
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
  { value: 1, label: "low", color: "green" },
  { value: 2, label: "medium", color: "yellow" },
  { value: 3, label: "high", color: "red" },
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

const CreateTaskForm = ({ onSubmit }: { onSubmit: Function }) => {
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(createTaskSchema),
  });

  const onSubmitFrom = (data: Schema) => {
    onSubmit(data);
  };

  const onerror = (err: any) => {
    console.log("err->", err);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmitFrom, onerror)}>
      <div className="grid grid-cols-3 gap-6 p-4">
        <div className="col-span-2 ">
          <Input
            type="text"
            {...register("taskName")}
            placeholder="Task Name"
            className="w-[400px] text-sm  text-slate-600  "
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
            <Button className="bg-[#7D6CE2FF] text-center">Add Skils</Button>
          </div>
          <div className="mt-4">
            <Label className="text-sm text-slate-800">Task Description</Label>
            <Textarea
              placeholder="Task Description "
              {...register("description")}
              onChange={(e) => {
                clearErrors(["description"]);
              }}
              name="description"
              className="w-full  h-[80px] outline-none text-sm font-sm text-slate-400  border-2"
            />
            {errors.description && (
              <span className="text-red-500 text-xs">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="mt-4">
            <Label className="text-sm text-slate-800 mt-4">
              Accepted Criteria
            </Label>
            <Input
              type="text"
              {...register("acceptanceCriteria")}
              placeholder="Acceptace criteria"
              className="w-[400px] outline-none text-xs font-semibold text-slate-600 "
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
            <div className="text-sm text-slate-900 uppercase w-full">
              <Label className="text-sm text-slate-800 "> Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    options={status}
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

          <div className="text-sm text-slate-900 uppercase w-full">
            <Label className="uppercase">HBAR-Price</Label>
            <Input
              type="number"
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

          <div className="text-sm text-slate-900 uppercase w-full">
            <Label className="text-sm text-slate-800 "> Reviewers</Label>
            <Controller
              name="reviewers"
              control={control}
              render={({ field }) => (
                <Select
                  options={Reviewers}
                  isMulti
                  onChange={(selectedOptions) => {
                    const values = selectedOptions
                      ? selectedOptions.map((option) => option.value)
                      : [];
                    field.onChange(values);
                    clearErrors("reviewers"); // Clear error on change
                  }}
                />
              )}
            />
            {errors.reviewers && (
              <span className="text-red-500 text-xs">
                {errors.reviewers.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateTaskForm;
