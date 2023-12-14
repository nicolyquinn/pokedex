import PageLayout from "@/sections/PageLayout";
import React from "react";
import { getAuth } from "firebase/auth";

function userProfile() {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <PageLayout pageTitle="userProfile">
      <div className="content flex justify-center items-center">
        <div className="w-fit bg-teal-50 py-10 px-12 rounded-lg flex flex-col items-start gap-2">
          <h3>User Profile</h3>
          <div className="flex justify-start">
            <p className="font-bold">Email:</p>
            <p>{user?.email}</p>
          </div>
          <div className="flex">
            <p className="font-bold">Full Name:</p>
            <p>{user?.displayName}</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default userProfile;
