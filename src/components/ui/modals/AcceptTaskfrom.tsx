"use client";
import React, { useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@apollo/client";
import { UPDATE_TASK_MUTATION } from "@/graphql/mutation";
import { useAppDispatch, useAppSelector } from "@/hooks/toolKitTyped";
import useSmartContract from "@/hooks/useSmartContract";
import { selectUserAuth } from "@/store/authSlice";
import Web3, { AbiItem } from "web3";
import useWeb3 from "@/hooks/useWeb3";

const AcceptTaskForm = ({
  taskId,
  handlePostSubmit,
}: {
  taskId: string;
  handlePostSubmit: Function;
}) => {
  const [submitTaskMutation] = useMutation(UPDATE_TASK_MUTATION);

  const [loading, setLoading] = useState<boolean>(false);
  // const { web3, walletAddress } = useAppSelector(selectUserAuth);
  const { connectToMetaMask, active } = useWeb3();

  const { web3 } = useAppSelector(selectUserAuth);

  const { callMethod, account } = useSmartContract();

  const onSubmitFrom = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitTaskMutation({
        variables: {
          _id: taskId,
          input: {
            status: 2, // task accepted
          },
        },
        onError(error: any): never {
          throw new Error(error);
        },
        onCompleted: async (res: any) => {
          handlePostSubmit(res);
        },
      });
    } catch (error) {
      console.log("error->", error);
    } finally {
      setLoading(false);
    }
  };

  const onerror = (err: any) => {
    console.log("err->", err);
  };

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => {
        onSubmitFrom(e);
      }}
    >
      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-col">
          <Button
            type="submit"
            className="block bg-[#7D6CE2FF] mt-4 w-full text-center"
            loading={loading}
          >
            Accpet Task
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AcceptTaskForm;
