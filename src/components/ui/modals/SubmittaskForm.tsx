'use client';
import React, { useState } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { set, z } from "zod";

import { Label } from "@radix-ui/react-label";
import { components } from "react-select";
import { useMutation } from "@apollo/client";
import { UPDATE_TASK_MUTATION } from "@/graphql/mutation";
import { useAppDispatch, useAppSelector } from "@/hooks/toolKitTyped";
import useSmartContract from "@/hooks/useSmartContract";
import { selectUserAuth } from "@/store/authSlice";
import Web3, { AbiItem } from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/sc-constants";
import useWeb3 from "@/hooks/useWeb3";
import { TASK_STATUS } from "@/conf/data";
import { toast } from "../use-toast";
import { ToastAction } from "@radix-ui/react-toast";

// Define the schema using Zod
const updateTaskSchema = z.object({
  docUrl: z.string().min(2, "Link is required"),
});

type Schema = z.infer<typeof updateTaskSchema>;

const SubmitTaskForm = ({
  taskId,
  handlePostSubmit,
  taskOnchainID,
}: {
  taskId: string;
  handlePostSubmit: Function;
  taskOnchainID: any;
}) => {
  const [submitTaskMutaion] = useMutation(UPDATE_TASK_MUTATION);
  const { connectToMetaMask, submitTask, active } = useWeb3();
  console.log("taskOnchainID+++", taskOnchainID);
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(updateTaskSchema),
  });

  const [loading, setLoading] = useState<boolean>(false);
  // const { web3, walletAddress } = useAppSelector(selectUserAuth);
  // const { connectToMetaMask, active } = useWeb3();

  const { web3 } = useAppSelector(selectUserAuth);

  const { callMethod, account } = useSmartContract();

  const onSubmitFrom = async (data: Schema) => {
    setLoading(true);
    try {
      console.log("taskOnchainID>>>>>>>>::", taskOnchainID);

      if (!active) {
        await connectToMetaMask();
      }

      let txn = await submitTask([taskOnchainID]);
      console.log("Txn>>>>>::", txn);

      await submitTaskMutaion({
        variables: {
          _id: taskId,
          input: {
            docUrl: data.docUrl,
            status: TASK_STATUS.REVIEW, // in review
          },
        },
        onError(error: any): never {
          throw new Error(error);
        },
        onCompleted: async (res: any) => {
          handlePostSubmit(res);
          // blockchain code
        },
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

      console.log("error->", error);
    } finally {
      setLoading(false);
    }
  };

  const onerror = (err: any) => {
    console.log("err->", err);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmitFrom, onerror)}>
      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-col">
          <Label className="text-md text-slate-800">Paste link</Label>
          <Input
            type="url"
            {...register("docUrl")}
            placeholder="paste link here...."
            className="w-full text-sm focus-visible:ring-0 focus:ring-0 border-2 border-slate-400 rounded-md text-slate-600"
          />
          {errors.docUrl && (
            <span className="text-red-500 text-xs">
              {errors.docUrl.message}
            </span>
          )}

          <Button
            type="submit"
            className="block bg-[#7D6CE2FF] mt-4 w-full text-center"
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SubmitTaskForm;
