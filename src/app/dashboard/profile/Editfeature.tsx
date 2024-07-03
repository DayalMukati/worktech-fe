"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from "react-select";
import { CirclePlus, Pencil } from "lucide-react";

const EditFeatureSchema = z.object({
  type: z.string().min(1, "Type is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  expedite: z.boolean().optional(),
  deposit: z.number().min(1, "Deposit is required"),
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string().refine((date) => {
    const startDate = new Date(date);
    return startDate <= new Date();
  }, "Start Date must be in the past or present"),
  endDate: z.string().refine((date) => {
    const endDate = new Date(date);
    return endDate >= new Date();
  }, "End Date must be in the future"),
  responsibilities: z.string().min(1, "Responsibilities are required"),
  skills: z.array(z.string()).min(1, "Skills are required"),
});

type FormValues = z.infer<typeof EditFeatureSchema>;

const skillsOptions = [
  { value: "MERN", label: "MERN" },
  { value: "MEAN", label: "MEAN" },
  { value: "Blockchain", label: "Blockchain" },
];

const EditFeature = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        aria-label="Edit Experience"
        title="Edit Experience"
      >
        <Pencil className="w-4 h-4 text-slate-400 cursor-pointer" />
      </button>
      {isOpen && (
        <div className="backdrop bg-slate-900 bg-opacity-95 fixed inset-0 flex justify-center items-center ">
          <div className="max-w-lg w-full bg-white mx-3 dark:bg-slate-800 rounded-lg p-6 overflow-auto h-[600px]">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">Edit Experience</h1>
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
                  htmlFor="company"
                  className="justify-start flex text-sm font-medium text-slate-700"
                >
                  Company
                </label>
                <Input
                  type="text"
                  id="company"
                  placeholder="Enter Company"
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
              <div className="mb-4">
                <label
                  htmlFor="responsibilities"
                  className="justify-start flex text-sm font-medium text-slate-700"
                >
                  Responsibilities
                </label>
                <Textarea
                  id="responsibilities"
                  placeholder="Enter Responsibilities"
                  {...register("responsibilities")}
                  className={`mt-1 ${
                    errors.responsibilities
                      ? "border-red-500"
                      : "border-slate-300"
                  } border-2 rounded-md`}
                  onClick={() => clearErrors("responsibilities")}
                />
                {errors.responsibilities && (
                  <span className="text-red-500 text-xs">
                    {errors.responsibilities.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className=" text-sm font-medium justify-start flex text-slate-700"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Enter Feature Description"
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

export default EditFeature;
