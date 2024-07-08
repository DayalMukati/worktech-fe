'use client';
import React, { useState } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Label } from '@radix-ui/react-label';
import { components } from 'react-select';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK_MUTATION } from '@/graphql/mutation';
import { useAppDispatch, useAppSelector } from '@/hooks/toolKitTyped';
import useSmartContract from '@/hooks/useSmartContract';
import { selectUserAuth } from '@/store/authSlice';
import Web3, { AbiItem } from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/sc-constants';
import useWeb3 from '@/hooks/useWeb3';
import { toast } from '../use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { setActivity } from "@/store/taskSlice";

// Define the schema using Zod

const CompleteTaskForm = ({
  reviewer,
  taskId,
  docUrl,
  handlePostSubmit,
  taskOnchainID,
}: {
  reviewer: string;
  taskId: string;
  docUrl: string;
  handlePostSubmit: Function;
  taskOnchainID: any;
}) => {
  const [updateTaskMutaion] = useMutation(UPDATE_TASK_MUTATION);
  //   console.log("reviewer>>>>>>>>>>>>", reviewer);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  // const { web3, walletAddress } = useAppSelector(selectUserAuth);

  const { web3 } = useAppSelector(selectUserAuth);

  const { callMethod, account } = useSmartContract();
  const { connectToMetaMask, completeTask, active, convertHbarToTinybars } =
    useWeb3();

  const onSubmitFrom = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("taskOnchainID>>>>>>++++++", taskOnchainID);

      if (!active) {
        await connectToMetaMask();
      }

      // let taskData = await getTaskData([taskOnchainID]);
      // const rewardAmount = Web3.utils.toWei(taskData.reward.toString(), 'ether')
      // const rewardAmount = await Web3.utils.fromWei(taskData.reward, 'ether');

      // console.log('taskData++++', {rewardAmount}, taskData.reward);
      let txn = await completeTask([taskOnchainID]);
      console.log("txn++++++", txn);
      setLoading(false);

      await updateTaskMutaion({
        variables: {
          _id: taskId,
          input: {
            status: 4, // completed
            activities: {
              // @ts-ignore
              userId: reviewer,
              activity: `Task Completed: ${
                "https://hashscan.io/testnet/transaction/" + txn.transactionHash
              }`,
            },
          },
        },
        onError(error: any): never {
          throw new Error(error);
        },
        onCompleted: async (res: any) => {
          console.log("task makred as completed", res);
          dispatch(setActivity(res.updateTask.activities as any));
          handlePostSubmit(res);
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
    <form autoComplete="off" onSubmit={(e) => onSubmitFrom(e)}>
      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-col">
          {/* <Input
						type='text'
						placeholder='submited task link ....'
						className='w-full text-sm focus-visible:ring-0 focus:ring-0 border-2 border-slate-400 rounded-md text-slate-600'
						value={docUrl}
					/> */}

          <pre className="w-full h-[80vh] text-muted-foreground whitespace-pre-wrap overflow-y-auto">
            {docUrl}
          </pre>
          <Button
            type="submit"
            className="block bg-[#7D6CE2FF] mt-4 w-full text-center"
            loading={loading}
          >
            Mark as Completed
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CompleteTaskForm;
