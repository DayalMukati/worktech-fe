"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from "react-select";
import { Pencil } from "lucide-react";
import { useMutation } from "@apollo/client";
import useSession from "@/hooks/use-session";
import { UPDATE_FEATURE_MUTATION, DELETE_FEATURE_MUTATION } from "@/graphql/mutation";
import { useAppDispatch } from "@/hooks/toolKitTyped";
import { updateFeatureWork, deleteFeatureWork } from "@/store/UserSlice";

const EditFeatureSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  description: z.string().optional(),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid Start Date"),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid End Date"),
  responsibilities: z.string().optional(),
  skills: z.array(z.string()).optional(),
}).superRefine((data, ctx) => {
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

type FormValues = z.infer<typeof EditFeatureSchema>;

const skillsOptions = [
  { value: "MERN", label: "MERN" },
  { value: "MEAN", label: "MEAN" },
  { value: "Blockchain", label: "Blockchain" },
];

interface EditFeatureProps {
  Data: any;
  index: number;
}

const EditFeature: React.FC<EditFeatureProps> = ({ Data, index }) => {
  const { session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(EditFeatureSchema),
    mode: "all",
  });

  const [updateFeatureMutation] = useMutation(UPDATE_FEATURE_MUTATION);
  const [deleteFeatureMutation] = useMutation(DELETE_FEATURE_MUTATION);
  const user = Data[index];

  const onSubmit = async (data: FormValues) => {
    if (!session._id) {
      console.error("Session ID is undefined");
      return;
    }

    try {
      const { data: mutationData } = await updateFeatureMutation({
        variables: {
          _id: session._id,
          input: {
            checkInput: {
              company: user.company,
              position: user.position,
            },
            featureWork: {
              company: data.company,
              startDate: data.startDate,
              endDate: data.endDate,
              skills: data.skills,
              position: data.position,
              responsibilities: data.responsibilities,
              description: data.description,
            },
          },
        },
      });

      console.log("Mutation response:", mutationData);

      dispatch(
        updateFeatureWork({
          index,
          updatedFeatureWork: {
            company: data.company,
            position: data.position,
            startDate: data.startDate,
            endDate: data.endDate,
            skills: data.skills || [],
            responsibilities: data.responsibilities || '',
            description: data.description || '',
          },
        })
      );

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
      const { data: mutationData } = await deleteFeatureMutation({
        variables: {
          _id: session._id,
          input: {
            company: user.company,
            position: user.position,
          },
        },
      });

      console.log("Delete response:", mutationData);

      dispatch(deleteFeatureWork(index));

      closeModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleModalToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const formatDate = (date: string | number | Date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const startDate = formatDate(user.startDate);
  const endDate = formatDate(user.endDate);

  return (
    <div>
      <button
        onClick={handleModalToggle}
        aria-label="Edit Experience"
        title="Edit Experience"
      >
        <Pencil className="w-4 h-4 text-slate-400 cursor-pointer" />
      </button>
      {isOpen && (
        <div className="backdrop bg-slate-900 bg-opacity-95 fixed inset-0 flex justify-center items-center ">
          <div className="max-w-lg w-full bg-white mx-3 dark:bg-slate-800 rounded-lg p-6 overflow-auto scrollbar-hide h-[600px]">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">Edit Experience</h1>
              <button
                className="text-slate-400 hover:text-slate-800 text-2xl"
                onClick={handleModalToggle}
              >
                &times;
              </button>
            </div>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="company"
                  className="justify-start flex text-sm font-medium text-slate-700"
                >
                  Company
                </label>
                <Input
                  type="text"
                  id="company"
                  placeholder="Enter Company"
                  defaultValue={user.company}
                  {...register("company")}
                  className={`mt-1 ${
                    errors.company ? "border-red-500" : "border-slate-300"
                  } border-2 rounded-md`}
                  onClick={() => clearErrors("company")}
                />
                {errors.company && (
                  <span className="text-red-500 text-xs">
                    {errors.company.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="position"
                  className="justify-start flex text-sm font-medium text-slate-700"
                >
                  Position
                </label>
                <Input
                  type="text"
                  id="position"
                  defaultValue={user.position}
                  placeholder="Enter Position"
                  {...register("position")}
                  className={`mt-1 ${
                    errors.position ? "border-red-500" : "border-slate-300"
                  } border-2 rounded-md`}
                  onClick={() => clearErrors("position")}
                />
                {errors.position && (
                  <span className="text-red-500 text-xs">
                    {errors.position.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="skills"
                  className="justify-start flex text-sm font-medium text-slate-700"
                >
                  Skills
                </label>
                <Controller
                  name="skills"
                  control={control}
                  defaultValue={user.skills}
                  render={({ field: { onChange, value = [] } }) => (
                    <Select
                      id="skills"
                      options={skillsOptions}
                      isMulti
                      onChange={(selectedOptions) => {
                        const values = selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : [];
                        onChange(values);
                        clearErrors("skills");
                      }}
                      value={value.map((skill) => ({
                        value: skill,
                        label: skill,
                      }))}
                      className={`mt-1 ${
                        errors.skills ? "border-red-500" : "border-slate-300"
                      } border-2 rounded-md`}
                      placeholder="Select Skills"
                    />
                  )}
                />
                {errors.skills && (
                  <span className="text-red-500 text-xs">
                    {errors.skills.message}
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
              <div className="mb-4">
                <label
                  htmlFor="responsibilities"
                  className="justify-start flex text-sm font-medium text-slate-700"
                >
                  Responsibilities
                </label>
                <Textarea
                  id="responsibilities"
                  defaultValue={user.responsibilities}
                  placeholder="Enter Responsibilities"
                  {...register("responsibilities")}
                  className={`mt-1 ${
                    errors.responsibilities ? "border-red-500" : "border-slate-300"
                  } border-2 rounded-md`}
                  onClick={() => clearErrors("responsibilities")}
                />
                {errors.responsibilities && (
                  <span className="text-red-500 text-xs">
                    {errors.responsibilities.message}
                  </span>
                )}
              </div>
              {/* <div className="mb-4">
                <label
                  htmlFor="description"
                  className="justify-start flex text-sm font-medium text-slate-700"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  defaultValue={user.description}
                  placeholder="Enter Description"
                  {...register("description")}
                  className={`mt-1 ${
                    errors.description ? "border-red-500" : "border-slate-300"
                  } border-2 rounded-md`}
                  onClick={() => clearErrors("description")}
                />
                {errors.description && (
                  <span className="text-red-500 text-xs">
                    {errors.description.message}
                  </span>
                )}
              </div> */}
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

export default EditFeature;
