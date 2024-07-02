'use client';
import React, { useState } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	Icon,
	ShieldCheck,
	CircleCheck,
	Users,
	DraftingCompass,
	LoaderCircle
} from 'lucide-react';

import { Label } from '@radix-ui/react-label';
import Select, { components } from 'react-select';
import { useMutation } from '@apollo/client';
import { CREATE_TASK_MUTATION } from '@/graphql/mutation';
import { useAppSelector } from '@/hooks/toolKitTyped';
import { getStatusNumber } from '@/lib/getStatusNumber';
import useSmartContract from '@/hooks/useSmartContract';
import { selectUserAuth } from '@/store/authSlice';
import Web3, { AbiItem } from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/sc-constants';
import useWeb3 from '@/hooks/useWeb3';
import { Textarea } from '../textarea';

// Define the schema using Zod
const createTaskSchema = z.object({
  taskName: z.string().min(2, "Task Name is required"),
  description: z.string().min(2, "Description is required"),
  acceptanceCriteria: z.string().min(2, "Acceptance Criteria is required"),
  status: z.number().min(1, "Status is required"),
  assignee: z.array(z.string()).min(1, "Assignee is required"),
  priority: z.string().min(1, "Priority is required"),
  reviewer: z.array(z.string()).min(1, "Reviewers is required"),
  price: z.string().min(1, "Price is required"),
  skills: z.array(z.string()).min(1, "Skills is required"),
});

type Schema = z.infer<typeof createTaskSchema>;

const status = [
  // { value: 0, label: 'open', icon: <CircleCheck /> },
  { value: 1, label: "to-do", icon: <CircleCheck /> },
  // { value: 2, label: 'in-progress', icon: <CircleCheck /> },
  // { value: 3, label: 'in-review', icon: <CircleCheck /> },
  // { value: 4, label: 'done', icon: <CircleCheck /> },
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

const CreateTaskForm = ({
  spaceId,
  handlePostSubmit,
  column,
  users,
  skillsData,
}: {
  spaceId: string;
  handlePostSubmit: Function;
  column: string;
  users: any;
  skillsData: any;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(createTaskSchema),
  });

  // const { web3, walletAddress } = useAppSelector(selectUserAuth);
  const [description, setDescription] = useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState("");
  const [isDescriptionGenerating, setIsDescriptionGenerating] = useState(false);
  const [isAcceptanceCriteriaGenerating, setIsAcceptanceCriteriaGenerating] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const { connectToMetaMask, createTask, active } = useWeb3();
  const Assignee = users?.map((user: any) => ({
    value: [user._id, user.walletAddress],
    label: user.email,
    icon: <Users className="w-4 h-4" />,
  }));
  const Reviewers = users?.map((user: any) => ({
    value: [user._id, user.walletAddress],
    label: user.email,
    icon: <Users className="w-4 h-4" />,
    
  }));

  // const { web3, walletAddress } = useAppSelector(selectUserAuth);

  // const { connectToMetaMask, createTask, active } = useWeb3();
  // const Assignee = users?.map((user: any) => ({
  // 	value: user._id,
  // 	label: user.email,
  // 	icon: <Users className='w-4 h-4' />
  // }));

  const Skills = skillsData?.map((skill: any) => ({
    value: skill._id,
    label: skill.title,
    icon: <DraftingCompass className="w-4 h-4" />,
  }));

  const { web3 } = useAppSelector(selectUserAuth);

  const { callMethod, account } = useSmartContract();

  const title = watch("taskName");
  const [createTaskMutaion] = useMutation(CREATE_TASK_MUTATION);

  const fetchDescription = async () => {
    if (!title && title.length < 1) {
      setError("taskName", {
        type: "manual",
        message: "Task Name must be more than one character",
      });
      return;
    }
    try {
      clearErrors("taskName");
      setIsDescriptionGenerating(true);
      const response = await fetch("/api/generate-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      const data = await response.json();
      setDescription(data.description);
      setValue("description", data.description);
      setIsDescriptionGenerating(false);
    } catch (error) {
      console.error("Error fetching description:", error);
      setIsDescriptionGenerating(false);
    }
  };

  const fetchAcceptanceCriteria = async () => {
    if (!title && title.length < 1) {
      setError("taskName", {
        type: "manual",
        message: "Task Name must be more than one character",
      });
      return;
    }
    clearErrors("taskName");
    setIsAcceptanceCriteriaGenerating(true);
    try {
      const response = await fetch("/api/generate-acceptance-criteria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feature: title }),
      });

      const data = await response.json();
      setAcceptanceCriteria(data.acceptanceCriteria);
      setValue("acceptanceCriteria", data.acceptanceCriteria);
      setIsAcceptanceCriteriaGenerating(false);
    } catch (error) {
      console.error("Error fetching acceptance criteria:", error);
      setIsAcceptanceCriteriaGenerating(false);
    }
  };

  const onSubmitFrom = async (data: Schema) => {
    setIsLoading(true);
    try {
      if (!active) {
        await connectToMetaMask();
      }
      const priceInWei = Web3.utils.toWei(data.price, "ether");
      let txn = await createTask([
        data.taskName,
        priceInWei,
        "0x6880c2B6d2C95003d9C73764F0855d41e9C967Bd",
      ]);
      let taskId = Number(txn.events.TaskCreated.returnValues[0]);
      // console.log(
      // 	'data->',
      // 	txn,
      // 	Number(txn.events.TaskCreated.returnValues[0], data);
      // );
      await createTaskMutaion({
        variables: {
          input: {
            space: spaceId,
            name: data.taskName,
            taskId: taskId,
            description: data.description,
            priority: data.priority,
            amount: Number(data.price),
            activities: [],
            reviewer: data.reviewer[0],
            assinees: [data.assignee[0]],
            skills: data.skills,
            acceptanceCriteria: data.acceptanceCriteria,
            status: data.status,
          },
        },
        onError(error: any): never {
          throw new Error(error);
        },
        onCompleted: async (res: any) => {
          handlePostSubmit(res);
        },
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
      <div className="gap-6 grid grid-cols-3 p-4">
        <div className="col-span-2">
          <Label className="text-md text-slate-800">Task Name</Label>
          <Input
            type="text"
            {...register("taskName")}
            placeholder="Task Name"
            className="w-[400px] text-sm focus-visible:ring-0 focus:ring-0 border-2 border-slate-400 rounded-md text-slate-600"
          />
          {errors.taskName && (
            <span className="text-red-500 text-xs">
              {errors.taskName.message}
            </span>
          )}
          <div className="flex gap-4 mt-4">
            <Button className="gap-3 bg-[#7D6CE2FF] text-center">
              <ShieldCheck className="w-4 h-4" />
              Permissions
            </Button>
            <div className="flex gap-4 max-w-xl">
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Select
                    placeholder="Select Skills"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "red" : "grey",
                        cursor: "pointer",
                      }),
                    }}
                    options={Skills}
                    isMulti
                    onChange={(selectedOptions) => {
                      const values = selectedOptions
                        ? selectedOptions.map(
                            (option: any) => option.value as any
                          )
                        : [];
                      field.onChange(values);
                      clearErrors("skills"); // Clear error on change
                    }}
                    components={{
                      Option: customOptionAssignee,
                      SingleValue: customSingleValueAssignee,
                    }}
                  />
                )}
              />
              {errors.skills && (
                <span className="mt-auto text-red-500 text-xs">
                  {errors.skills.message}
                </span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center w-full">
              <Label className="text-md text-slate-800">Task Description</Label>
              {!isDescriptionGenerating ? (
                <Button
                  variant={"link"}
                  type="button"
                  onClick={fetchDescription}
                >
                  Generate Description
                </Button>
              ) : (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              )}
            </div>
            <Textarea
              placeholder="Task Description "
              {...register("description")}
              onChange={() => {
                clearErrors(["description"]);
              }}
              name="description"
              className="border-2 border-slate-400 rounded-md w-full h-[80px] font-sm text-slate-600 text-sm indent-2 outline-none"
            />

            {errors.description && (
              <span className="text-red-500 text-xs">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center w-full">
              <Label className="mt-4 text-md text-slate-800">
                Accepted Criteria
              </Label>
              {!isAcceptanceCriteriaGenerating ? (
                <Button
                  variant={"link"}
                  type="button"
                  onClick={fetchAcceptanceCriteria}
                >
                  Generate Accepted Criteria
                </Button>
              ) : (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              )}
            </div>
            <Textarea
              {...register("acceptanceCriteria")}
              placeholder="Acceptace criteria"
              className="border-2 border-slate-400 rounded-md w-full font-sm text-slate-600 text-sm indent-2 outline-none"
            />

            {errors.acceptanceCriteria && (
              <span className="text-sred-500 text-xs">
                {errors.acceptanceCriteria.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="block bg-[#7D6CE2FF] mt-4 w-full text-center"
            loading={isLoading}
          >
            Create
          </Button>
        </div>

        <div>
          <div className="flex flex-col justify-between items-center gap-4">
            <div className="w-full text-slate-900 text-sm uppercase">
              <Label className="text-slate-800 text-sm"> Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "red" : "grey",
                        cursor: "pointer",
                      }),
                    }}
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

            <div className="w-full text-slate-900 text-sm uppercase">
              <Label className="text-slate-800 text-sm"> Assignee</Label>
              <Controller
                name="assignee"
                control={control}
                render={({ field }) => (
                  <Select
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "red" : "grey",
                        cursor: "pointer",
                      }),
                    }}
                    options={Assignee}
                    onChange={(selectedOption) => {
                      field.onChange(
                        selectedOption ? selectedOption.value : null
                      );
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

            <div className="w-full text-slate-900 text-sm uppercase">
              <Label className="text-slate-800 text-sm"> Priority</Label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "red" : "grey",
                        cursor: "pointer",
                      }),
                    }}
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

          <div className="mt-2 w-full text-slate-900 text-sm uppercase">
            <Label className="uppercase">HBAR-Price</Label>
            <Input
              type="text"
              className="focus-visible:ring-0 focus:ring-0"
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

          <div className="mt-2 w-full text-slate-900 text-sm uppercase">
            <Label className="text-slate-800 text-sm"> Reviewer</Label>
            <Controller
              name="reviewer"
              control={control}
              render={({ field }) => (
                <Select
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused ? "red" : "grey",
                      cursor: "pointer",
                    }),
                  }}
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
