"use client";
import React from "react";
import Modal from "../modal";
import { Button } from "../button";
import { Input } from "../input";
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

const status = [
  { value: 0, label: "open", icon: <CircleCheck /> },
  { value: 1, label: "to-do", icon: <CircleCheck /> },
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
  { value: 0, label: "low", color: "green" },
  { value: 1, label: "medium", color: "yellow" },
  { value: 2, label: "high", color: "red" },
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

const Price = [
  { value: 0, label: "$0" },
  { value: 1, label: "$1" },
  { value: 2, label: "$2" },
  { value: 3, label: "$3" },
  { value: 4, label: "$4" },
  { value: 5, label: "$5" },
  { value: 6, label: "$6" },
  { value: 7, label: "$7" },
  { value: 8, label: "$8" },
  { value: 9, label: "$9" },
  { value: 10, label: "$10" },
];

const CreateTask = () => {
  const [showModal, setShowModal] = React.useState(true);
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(!showModal);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <Modal
      activeModal={showModal}
      isHeader={false}
      noFade={true}
      toggleModal={toggleModal}
      onClose={closeModal}
      className="max-w-6xl bg-transparent "
    >
      <form autoComplete="off" onSubmit={() => {}}>
        <div className="grid grid-cols-3 gap-6 p-4">
          <div className="col-span-2 ">
            <Input
              type="text"
              placeholder="Task name"
              className="w-[400px]  text-md font-semibold text-slate-600  "
            />
            <div className="flex gap-4 mt-4 ">
              <Button className="bg-[#7D6CE2FF] text-center gap-3">
                <ShieldCheck className="w-4 h-4 " />
                Permissions
              </Button>
              <Button className="bg-[#7D6CE2FF] text-center">Add Skils</Button>
            </div>
            <div className="mt-4">
              <Label className="text-sm text-slate-800  ">
                Task Description
              </Label>
              <Textarea
                placeholder="Task description "
                name="description"
                className="w-full outline-none text-md font-sm text-slate-400  border-2"
              />
            </div>
            <div className="mt-4">
              <Label className="text-sm text-slate-800 mt-4">
                Accepted Criteria
              </Label>
              <Input
                type="text"
                placeholder="Acceptace criteria"
                className="w-[400px] outline-none text-xs font-semibold text-slate-600 "
              />
            </div>

            <Button
              type="submit"
              className="block w-full bg-[#7D6CE2FF] text-center mt-10 "
            >
              Create
            </Button>
          </div>

          <div>
            <div className="flex flex-col justify-between items-center gap-4">
              <div className="text-sm text-slate-900 uppercase w-full">
                <Label className="text-sm text-slate-800 "> Status</Label>
                <Select
                  options={status}
                  components={{
                    Option: customOption,
                    SingleValue: customSingleValue,
                  }}
                />
              </div>
              <div className="text-sm text-slate-900 uppercase w-full">
                <Label className="text-sm text-slate-800 "> Assignee</Label>
                <Select
                  options={Assignee}
                  isMulti
                  components={{
                    Option: customOptionAssignee,
                    SingleValue: customSingleValueAssignee,
                  }}
                />
              </div>
              <div className="text-sm text-slate-900 uppercase w-full">
                <Label className="text-sm text-slate-800 "> Priority</Label>
                <Select
                  options={Priority}
                  components={{
                    Option: customPriorityOption,
                    SingleValue: customPrioritySingleValue,
                  }}
                />
              </div>
              <div className="text-sm text-slate-900 uppercase w-full">
                <Label className="text-sm text-slate-800 "> Price</Label>
                <Select options={Price} />
              </div>
              <div className="text-sm text-slate-900 uppercase w-full">
                <Label className="uppercase">Reviewers</Label>
                <Input type="text" placeholder="Reviewers" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTask;
