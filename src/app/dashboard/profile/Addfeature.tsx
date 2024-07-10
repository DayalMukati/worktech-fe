"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSession from "@/hooks/use-session";
import Select from "react-select";
import { CirclePlus } from "lucide-react";
import { ADD_FEATURE_MUTATION } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import { addFeatureWork } from "@/store/UserSlice";
import { useAppDispatch } from "@/hooks/toolKitTyped";

const addFeatureSchema = z.object({
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


type FormValues = z.infer<typeof addFeatureSchema>;

const skillsOptions = [
  { value: "MERN", label: "MERN" },
  { value: "MEAN", label: "MEAN" },
  { value: "Blockchain", label: "Blockchain" },
];

const AddFeature = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useSession();
  const dispatch = useAppDispatch();
  const {
    register,
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(addFeatureSchema),
    mode: "all",
  });
  const [addFeatureMutation] = useMutation(ADD_FEATURE_MUTATION);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    
    setIsOpen(false);
    reset()
  };

  const onSubmit = async (data: FormValues) => {
    if (!session?._id) {
      console.error("Session ID is undefined");
      return;
    }
  
    try {
      const { data: mutationData } = await addFeatureMutation({
        variables: {
          _id: session._id,
          input: [
            {
              company: data.company,
              position: data.position,
              startDate: data.startDate,
              endDate: data.endDate,
              skills: data.skills || [], // Default to an empty array if no skills are selected
              responsibilities: data.responsibilities || "", // Provide default empty string if undefined
              description: data.description || "", // Default to an empty string if no description is provided
            },
          ],
        },
      });
  
      console.log("Mutation response:", mutationData);
  
       const newFeatureWork = mutationData?.addUserFeatureWork?.featureWork;
  
      if (newFeatureWork && newFeatureWork.length > 0) {
         const featureWorks = newFeatureWork.map((work) => ({
          company: work.company || "",
          position: work.position || "",
          skills: work.skills || [],
          responsibilities: work.responsibilities || "", 
          startDate: work.startDate || "",  
          endDate: work.endDate || "", 
          description: work.description || "",
        }));
  
         dispatch(addFeatureWork(featureWorks));
      } else {
        console.error("Feature work data is missing in the mutation response");
      }
  
      closeModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <div>
      <button
        onClick={toggleModal}
        aria-label="Add Experience"
        title="Add Experience"
      >
        <CirclePlus className="w-12 h-12 text-slate-900 cursor-pointer mt-6" />
      </button>
      {isOpen && (
        <div className="backdrop bg-slate-900 bg-opacity-95 fixed inset-0 flex justify-center items-center ">
          <div className="max-w-lg w-full bg-white mx-3 dark:bg-slate-800 rounded-lg p-6 overflow-auto scrollbar-hide h-[600px]">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">Add Experience</h1>
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
              </div> */}
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

export default AddFeature;
