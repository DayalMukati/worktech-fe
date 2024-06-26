"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/toolKitTyped";
import {
  selectLayout,
  setIsCreateSpaceModalOpen,
  setOrgCreationModal,
} from "@/store/layoutSlice";
import { Aperture, Building2, SpaceIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { spaces } from "@/conf/data";
import { createSpace } from "@/store/spacesSlice";

// Define the schema using Zod
const spacesSchema = z.object({
  name: z.string().min(1, "Name is required"),
  visibility: z.boolean(),
  // tasks: z.array(z.string()).min(1, "At least one task is required"),
});

type Schema = z.infer<typeof spacesSchema>;

function SpacesAddModal() {
  const dispatch = useAppDispatch();
  const { isCreateSpaceModalOpen } = useAppSelector(selectLayout);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Schema>({
    defaultValues: {
      visibility: false,
    },
    resolver: zodResolver(spacesSchema),
  });

  const onSubmit = (data: Schema) => {
    console.log(data);
    const newSpace = {
      name: data.name,
      visibility: data.visibility,
    };
    dispatch(createSpace({ space: newSpace }));
    dispatch(setIsCreateSpaceModalOpen(false));
  };

  const onError = (errors: any) => {
    console.log(errors);
  };

  return (
    <Dialog modal={true} open={isCreateSpaceModalOpen} >
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
          dispatch(setIsCreateSpaceModalOpen(false));
        }}
        className="sm:max-w-[700px] p-8 "
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <DialogHeader className="flex flex-col justify-center items-center   ">
            <DialogTitle className="text-md font-thin text-left w-full ">
              SPACE NAME
            </DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            {...register("name")}
            placeholder="Enter a name"
            className="w-full text-md   text-slate-600  py-4 px-6 border-2 border-slate-300 mt-4 "
          />

          {/* <Aperture className="w-6 h-6 absolute left-4 top-4 text-slate-600 " /> */}
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
          <div className="flex justify-center items-center gap-4 p-4 my-4">
            <div className="w-1/2 flex gap-2 border p-2 rounded-lg border-primary/60 shadow-lg">
              <input type="radio" name="spaces" className="w-6 h-6 text-primary" />
              <div className="flex flex-col justify-center items-center">
                <Building2 className="w-4 h-4 text-slate-600 " />
                <span className="text-md text-slate-600">Spaces</span>

                <span className="text-md text-slate-600">
                  Use Spaces as containers to organize and categorize work.
                  Recommended for your Guilds, Teams, Pods.
                </span>
              </div>
            </div>
            <div className="w-1/2 flex gap-2 border p-2 rounded-lg border-primary/60 shadow-lg">
              <input type="radio" name="spaces" className="w-6 h-6" />

              <div className="flex flex-col justify-center items-center">
                <Building2 className="w-4 h-4 text-slate-600 " />
                <span className="text-md text-slate-600">Projects</span>
                <span className="text-md text-slate-600">
                  Use Projects to manage tasks that are part of a larger goal.
                  Projects can have a Status Finish Date and Budget.
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-md text-slate-700 ">VISIBILITY</h1>
            <span className="text-md text-slate-400">
              Anyone can view this space and its tasks
            </span>
            <div className="flex  items-center  mt-4 ">
              {/* <h1>{visibility ? "Private" : "Public"}</h1> */}
              <Controller
                name="visibility"
                control={control}
                render={({ field }) => (
                  <>
                    <h1 className="text-md text-gray-700">
                      {field.value ? "Private" : "Public"}
                    </h1>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="ml-2 "
                    />
                  </>
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <div className="flex flex-col justify-center items-center space-y-2 w-full">
              <Button className="w-full text-lg p-6 mt-4" type="submit">
                Create
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SpacesAddModal;
