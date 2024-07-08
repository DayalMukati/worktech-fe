"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import useSession from "@/hooks/use-session";
import { useMutation } from "@apollo/client";
import { ADD_EDUCATION_MUTATION } from "@/graphql/mutation";
import { useAppDispatch } from "@/hooks/toolKitTyped";
import { addEducation } from "@/store/UserSlice"; // Adjust the import path as necessary
import { useForm } from "react-hook-form";

const addEducationSchema = z
  .object({
    degree: z.string().min(1, "Degree is required"),
    institute: z.string().min(1, "Institution is required"),
    startDate: z.string().refine((date) => {
      const startDate = new Date(date);
      return startDate <= new Date();
    }, "Start Date must be in the past or present"),
    endDate: z.string(),
  })
  .superRefine((data, ctx) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    if (endDate < startDate) {
      ctx.addIssue({
        code: "custom",
        message: "End Date must be greater than Start Date",
        path: ["endDate"],
      });
    }
  });

type FormValues = z.infer<typeof addEducationSchema>;

const AddEducation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useSession();
  const dispatch = useAppDispatch(); // Use the custom hook for dispatch
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(addEducationSchema),
    mode: "all",
  });
  const [addEducationMutation] = useMutation(ADD_EDUCATION_MUTATION);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
    reset();
  };

  const onSubmit = async (data: FormValues) => {
    if (!session._id) {
      console.error("Session ID is undefined");
      return;
    }

    try {
      const { data: mutationData } = await addEducationMutation({
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

      if (mutationData) {
        dispatch(
          addEducation({
            institute: data.institute,
            degree: data.degree,
            startDate: data.startDate,
            endDate: data.endDate,
          })
        );
      }

      console.log("Mutation response:", mutationData);

      closeModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        aria-label="Add Education"
        title="Add Education"
      >
        <Plus className="w-6 h-6 text-slate-900 cursor-pointer" />
      </button>
      {isOpen && (
        <div className="backdrop bg-slate-900 bg-opacity-95 fixed inset-0 flex justify-center items-center ">
          <div className="max-w-lg w-full bg-white mx-3 dark:bg-slate-800 rounded-lg p-6 overflow-auto  h-[460px]">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">Add Education</h1>
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
              <Button
                type="submit"
                className="w-full bg-slate-800 text-white py-2 rounded-lg flex justify-center items-center"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEducation;
