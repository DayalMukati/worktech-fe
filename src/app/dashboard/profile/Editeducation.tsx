"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Pencil, Plus } from "lucide-react";
import { useMutation } from "@apollo/client";
import useSession from "@/hooks/use-session";
import { UPDATE_EDUCATION_MUTATION, DELETE_EDUCATION_MUTATION } from "@/graphql/mutation";

const EditFeatureSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institute: z.string().min(1, "Institution is required"),
  startDate: z.string().refine((date) => {
    const startDate = new Date(date);
    return startDate <= new Date();
  }, "Start Date must be in the past or present"),
  endDate: z.string().refine((date) => {
    const endDate = new Date(date);
    return endDate >= new Date();
  }, "End Date must be in the future"),
});

type FormValues = z.infer<typeof EditFeatureSchema>;

interface EditEducationProps {
  Data: any;
  index: any;
}

const EditEducation: React.FC<EditEducationProps> = ({ Data, index }) => {
  const { session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const user = Data[index];

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(EditFeatureSchema),
    mode: "all",
  });

  const [updateEducationMutation] = useMutation(UPDATE_EDUCATION_MUTATION);
  const [deleteEducationMutation] = useMutation(DELETE_EDUCATION_MUTATION);

  const onSubmit = async (data: FormValues) => {
    if (!session._id) {
      console.error("Session ID is undefined");
      return;
    }
    try {
      const { data: mutationData } = await updateEducationMutation({
        variables: {
          _id: session._id,
          input: {
            institute: data.institute,
            startDate: data.startDate,
            endDate: data.endDate,
            degree: data.degree,
          },
        },
      });
      console.log("Mutation response:", mutationData);
      closeModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onDelete = async () => {
    if (!session._id) {
      console.error("Session ID is undefined");
      return;
    }
    try {
      const { data: mutationData } = await deleteEducationMutation({
        variables: {
          _id: session._id,
          input: {
            institute: user.institute,
            degree: user.degree,
          },
        },
      });
      console.log("Delete response:", mutationData);
      closeModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const formatDate = (date: string | number | Date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const startDate = formatDate(user.startDate);
  const endDate = formatDate(user.endDate);

  return (
    <div>
      <button
        onClick={toggleModal}
        aria-label="Edit Education"
        title="Edit Education"
      >
        <Pencil className="w-4 h-4 text-slate-400 cursor-pointer" />
      </button>
      {isOpen && (
        <div className="backdrop bg-slate-900 bg-opacity-95 fixed inset-0 flex justify-center items-center ">
          <div className="max-w-lg w-full bg-white mx-3 dark:bg-slate-800 rounded-lg p-6 overflow-auto h-[460px]">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">Edit Education</h1>
              <button
                className="text-slate-400 hover:text-slate-800 text-2xl"
                onClick={toggleModal}
              >
                &times;
              </button>
            </div>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="institute"
                  className="justify-start flex text-sm font-medium text-slate-700"
                >
                  Institute
                </label>
                <Input
                  type="text"
                  id="institute"
                  placeholder="Enter Institute"
                  defaultValue={user.institute}
                  {...register("institute")}
                  className={`mt-1 ${
                    errors.institute ? "border-red-500" : "border-slate-300"
                  } border-2 rounded-md`}
                  onClick={() => clearErrors("institute")}
                />
                {errors.institute && (
                  <span className="text-red-500 text-xs">
                    {errors.institute.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="degree"
                  className="justify-start flex text-sm font-medium text-slate-700"
                >
                  Degree
                </label>
                <Input
                  type="text"
                  id="degree"
                  placeholder="Enter Degree"
                  defaultValue={user.degree}
                  {...register("degree")}
                  className={`mt-1 ${
                    errors.degree ? "border-red-500" : "border-slate-300"
                  } border-2 rounded-md`}
                  onClick={() => clearErrors("degree")}
                />
                {errors.degree && (
                  <span className="text-red-500 text-xs">
                    {errors.degree.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="startDate"
                  className="justify-start flex text-sm font-medium text-slate-700"
                >
                  Start Date
                </label>
                <Input
                  type="date"
                  id="startDate"
                  defaultValue={startDate}
                  {...register("startDate")}
                  className={`mt-1 ${
                    errors.startDate ? "border-red-500" : "border-slate-300"
                  } border-2 rounded-md`}
                  onClick={() => clearErrors("startDate")}
                />
                {errors.startDate && (
                  <span className="text-red-500 text-xs">
                    {errors.startDate.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="endDate"
                  className="justify-start flex text-sm font-medium text-slate-700"
                >
                  End Date
                </label>
                <Input
                  type="date"
                  id="endDate"
                  defaultValue={endDate}
                  {...register("endDate")}
                  className={`mt-1 ${
                    errors.endDate ? "border-red-500" : "border-slate-300"
                  } border-2 rounded-md`}
                  onClick={() => clearErrors("endDate")}
                />
                {errors.endDate && (
                  <span className="text-red-500 text-xs">
                    {errors.endDate.message}
                  </span>
                )}
              </div>
              <div className="flex justify-between space-x-2">
                <Button
                  type="button"
                  onClick={onDelete}
                  className="w-full bg-red-600 text-white py-2 rounded-lg flex justify-center items-center"
                >
                  Delete
                </Button>
                <Button
                  type="submit"
                  className="w-full bg-slate-800 text-white py-2 rounded-lg flex justify-center items-center"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditEducation;
