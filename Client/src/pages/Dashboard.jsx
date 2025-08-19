import { AuroraText } from "@/components/ui";
import React from "react";
import { useSelector } from "react-redux";

function Dashboard() {

  const user = useSelector(state => state.user.user) 
  const authStatus = useSelector(state => state.user.authStatus) 
  

  console.log(user, authStatus);
  
    
  return (
    <div className="min-h-screen w-full bg-zinc-950 flex justify-center items-center text-white">
      <div>
        <h1 className="text-6xl font-bold text-center">
          <AuroraText>Dashboard</AuroraText> is Coming...
        </h1>
        {authStatus ? (
          <div className="m-6 ">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Profile completed: {user.profileCompleted ? "true" : "false"}</p>
            <p>On Boarding Step: {user.onBoardingStep}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;
