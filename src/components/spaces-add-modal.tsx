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
import { addSpace } from "@/store/spacesSlice";
import { CREATE_SPACE_MUTATION } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";

// Define the schema using Zod
const spacesSchema = z.object({
  name: z.string().min(1, "Name is required"),
  visibility: z.boolean().optional(),
  // tasks: z.array(z.string()).min(1, "At least one task is required"),
});

type Schema = z.infer<typeof spacesSchema>;

function SpacesAddModal({ orgId }: { orgId: string }) {
  const dispatch = useAppDispatch();
  const [createSpace] = useMutation(CREATE_SPACE_MUTATION);

  const { isCreateSpaceModalOpen } = useAppSelector(selectLayout);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Schema>({
    defaultValues: {
      visibility: true,
    },
    resolver: zodResolver(spacesSchema),
  });

  const onSubmit = (data: Schema) => {
    const newSpace = {
      _id: Math.random().toString(),
      org: orgId,
      name: data.name,
      visibility: data.visibility,
      status: 1,
    };

    try {
      createSpace({
        variables: {
          input: {
            org: orgId,
            name: data.name,
            status: 1,
            visibility: data.visibility === false ? "private" : "public",
          },
        },
        onCompleted: (data) => {
          console.log(data);
          const newSpace = {
            _id: data.createSpace._id,
            org: orgId,
            name: data.createSpace.name,
            visibility: data.createSpace.visibility,
            status: data.createSpace.status,
          };
          dispatch(addSpace({ space: newSpace }));
          dispatch(setIsCreateSpaceModalOpen(false));
        },
      });
    } catch (error) {}
  };

  const onError = (errors: any) => {
    console.log(errors);
  };

  return (
    <Dialog modal={true} open={isCreateSpaceModalOpen}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
          dispatch(setIsCreateSpaceModalOpen(false));
        }}
        className="sm:max-w-[700px]"
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <DialogHeader className="flex flex-col justify-center items-center ">
            <DialogTitle className="text-md font-thin text-left w-full ">
              SPACE NAME
            </DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            {...register("name")}
            placeholder="Enter a name"
            className="w-full text-lg   text-slate-600  py-6 px-4 border-2 border-slate-300 mt-2 "
          />

          {/* <Aperture className="w-6 h-6 absolute left-4 top-4 text-slate-600 " /> */}
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
          <div className="flex justify-center items-center gap-4 p-4 my-4">
            <div className="w-1/2 flex gap-2">
              <input type="radio" name="spaces" className="w-6 h-6" />
              <div className="flex flex-col justify-center items-center">
                <Building2 className="w-4 h-4 text-slate-600 " />
                <span className="text-md text-slate-600">Spaces</span>

                <span className="text-lg text-slate-600">
                  Use Spaces as containers to organize and categorize work.
                  Recommended for your Guilds, Teams, Pods.
                </span>
              </div>
            </div>
            <div className="w-1/2 flex gap-2">
              <input type="radio" name="spaces" className="w-6 h-6" />

              <div className="flex flex-col justify-center items-center">
                <Building2 className="w-4 h-4 text-slate-600 " />
                <span className="text-md text-slate-600">Projects</span>
                <span className="text-lg text-slate-600">
                  Use Projects to manage tasks that are part of a larger goal.
                  Projects can have a Status Finish Date and Budget.
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl ">VISIBILITY</h1>
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
                    <h1 className="text-lg text-gray-700">
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
