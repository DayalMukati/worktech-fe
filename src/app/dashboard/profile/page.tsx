"use client";
import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_TOKEN } from "@/graphql/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { CircleHelp, CirclePlus, Coffee, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadUser, selectUserAuth } from "@/store/authSlice";
import Icons from "@/components/ui/icon";
interface User {
  firstName: string;
}

interface QueryData {
  getUserByToken: User;
}

interface QueryVariables {
  token: string;
}

const Profile: React.FC<{ userToken: string }> = ({ userToken }) => {
  const [user, setUser] = useState<User | null>(null);
  const token = localStorage.getItem("authToken");

  const { data, loading, error } = useQuery<QueryData, QueryVariables>(
    GET_USER_BY_TOKEN,
    {
      variables: { token: token || "" },
    }
  );

  const [isEditing, setIsEditing] = useState(false);
  const profileInfoRef = useRef<HTMLDivElement>(null);
  const editFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      setUser(data.getUserByToken);
    }
  }, [data]);

  const handleEditClick = () => {
    if (profileInfoRef.current && editFormRef.current) {
      profileInfoRef.current.classList.add("hidden");
      editFormRef.current.classList.remove("hidden");
      setIsEditing(true);
    }
  };

  const handleCancelClick = () => {
    if (profileInfoRef.current && editFormRef.current) {
      profileInfoRef.current.classList.remove("hidden");
      editFormRef.current.classList.add("hidden");
      setIsEditing(false);
    }
  };

  const handleSaveClick = () => {
    if (profileInfoRef.current && editFormRef.current) {
      profileInfoRef.current.classList.remove("hidden");
      editFormRef.current.classList.add("hidden");
      setIsEditing(false);
      // Add save functionality here
    }
  };

  if (loading)
    return (
      <p className="flex justify-center items-center h-full">Loading...</p>
    );

  if (error)
    return (
      <p className="flex justify-center items-center h-full">
        Error: {error.message}
      </p>
    );

  return (
    <div className="flex  px-36 mt-12 ">
      <div className="flex flex-col w-1/3 gap-4">
        <div className="flex h-full flex-col justify-between items-center gap-1">
          <div className=" w-full rounded-md border border-slate-300 shadow-lg bg-card text-card-foreground  max-w-md mx-auto  flex flex-col items-center justify-center gap-1 p-6">
                  <div className="relative">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      className="w-28 h-28 rounded-full"
                    />
                    <AvatarFallback>Avatar</AvatarFallback>
                  </Avatar>
                  {isEditing ? (
                    <button
                      id="edit-button"
                      className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full"
                    >
                      {" "}
                      <Icons icon="mdi:pencil"></Icons>
                    </button>
                  ) : null}
                </div>
                <div
                  id="profile-info"
                  ref={profileInfoRef}
                  className={`mt-4 text-center ${isEditing ? "hidden" : ""}`}
                >
                  <h2 className="text-lg font-semibold">
                    {data?.getUserByToken.firstName}
                  </h2>
                  <p className="text-muted-foreground">No bio..</p>
                </div>
                <div
                  id="edit-form"
                  ref={editFormRef}
                  className={`mt-4 w-full ${isEditing ? "" : "hidden"}`}
                >
                  <div className="mb-2">
                    <input
                      type="text"
                      defaultValue={data?.getUserByToken.firstName}
                      className="w-full p-2 bg-input text-foreground border border-border rounded-md"
                    />
                  </div>
                  <div className="mb-2">
                    <textarea
                      className="w-full p-2 bg-input text-foreground border border-border rounded-md"
                      rows={2}
                    >
                      Add a bio...
                    </textarea>
                  </div>
                  <div className="mb-2 flex items-center justify-center">
                    <Icons icon='mdi:github' className='h-8 w-8 mr-1' ></Icons>
                    <input
                      type="text"
                      defaultValue="https://github.com/harsh"
                      className="w-full p-2 bg-input text-foreground border border-border rounded-md"
                    />
                  </div>
                  <div className="mb-2 flex items-center justify-center">
                  <Icons icon='mdi:linkedin' className='h-8 w-8 mr-1 text-blue-900' ></Icons>

                    <input
                      type="text"
                      defaultValue="https://www.linkedin.com/in/harsh"
                      className="w-full p-2 bg-input text-foreground border border-border rounded-md"
                    />
                  </div>
                  <div className="mb-2 flex items-center justify-center">
                  <Icons icon='mdi:twitter' className='h-8 w-8 mr-1 text-blue-600' ></Icons>

                    <input
                      type="text"
                      defaultValue="https://twitter.com/harsh"
                      className="w-full p-2 bg-input text-foreground border border-border rounded-md"
                    />
                  </div>

                  <div className="mb-2 flex items-center justify-center">
                  <Icons icon='mdi:location-outline' className='h-8 w-8 mr-1 text-primary' ></Icons>

                    
                    <input
                      type="text"
                      defaultValue="Indore,MP"
                      className="w-full p-2 bg-input text-foreground border border-border rounded-md"
                    />
                  </div>
                </div>
                {isEditing ? (
                  <div className="flex justify-between">
                    <Button
                      id="cancel-button"
                      className="bg-slate-300 hover:bg-slate-400 text-slate-900 shadow  px-4 py-1  mx-2 rounded-md"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </Button>
                    <Button
                      id="save-button"
                      className="bg-primary text-primary-foreground px-4 py-1 rounded-md"
                      onClick={handleSaveClick}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <Button
                    id="settings-button"
                    className="bg-primary w-full text-primary-foreground px-4 py-1 rounded-md"
                    onClick={handleEditClick}
                  >
                    Edit Profile
                  </Button>
                )}
                <Button
                  id="settings-button"
                  className="bg-primary w-full text-primary-foreground px-4 py-1 rounded-md mt-1"
                >
                  Settings
                </Button>
           </div>

          <div className="h-fit w-full rounded-md border border-slate-300 shadow-lg p-4 text-slate-400 flex flex-col gap-6">
            <div className="flex gap-2 items-center text-md">
              <h1 className="text-sm text-slate-400 font-semibold">
                REPUTATION SCORE
              </h1>
              <CircleHelp className="text-slate-400 w-4 h-4" />
            </div>
            <div className="flex flex-col text-md">
              <h1 className="text-sm text-slate-400 font-semibold">EARNINGS</h1>
              <span>$0.00</span>
            </div>
            <div className="flex flex-col text-md">
              <h1 className="text-sm text-slate-400 font-semibold">
                REVENUE SHARE
              </h1>
              <span>1.00%</span>
            </div>
          </div>
          <div className="h-fit w-full rounded-md border border-slate-300 shadow-lg p-4 text-slate-400 flex flex-col gap-6">
            <div className="w-full">
              <h1 className="text-sm text-slate-400 font-semibold">
                ORGANIZATIONS
              </h1>
              <div className="border-primary/60 border-2 rounded-md flex gap-2 p-2">
                <Zap className="w-6 h-6 text-black" />
                KC
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-2/3 space-y-1 mx-2">
        <div className="flex flex-col h-[18rem]  rounded-md border justify-center border-slate-300 shadow-lg p-2">
          <h1 className="text-lg text-slate-600 font-semibold">
            Featured work
          </h1>
          <div className="flex flex-col border border-dashed border-slate-400 p-6 justify-center items-center text-center h-full w-1/3">
            <CirclePlus className="w-12 h-12 text-slate-900 cursor-pointer" />
            <span className="text-sm text-slate-500 font-semibold mt-4">
              Feature work to show your experience
            </span>
          </div>
        </div>
        <div className="flex flex-col  rounded-md border border-slate-300 shadow-lg bg-white p-2">
          <p className="text-lg text-slate-600 font-semibold">Contribution</p>
          <div className="flex flex-col  justify-center items-center mt-4">
            <Coffee className="w-16 h-16 text-slate-800 cursor-pointer bg-secondary rounded-full p-2" />
            <span className="text-md text-slate-400">
              No public tasks completed yet
            </span>
            <Button className="bg-primary text-md px-4 h-fit my-2">
              Explore open tasks
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
