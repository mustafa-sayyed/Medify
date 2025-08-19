import { Button } from "@/components/ui";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-zinc-950 flex flex-col justify-center items-center px-2">
      <h1 className="text-6xl font-bold">Page not Found</h1>
      <DotLottieReact
        autoplay
        loop
        src={"/src/assets/404.lottie"}
        style={{
          width: "600px",
          backgroundColor: "",
          borderRadius: "10px",
          margin: "10px",
        }}
      />
      <p> We can’t seem to find the page you are looking for!</p>
      <div className="flex items-center gap-3 mt-3">
        <Button className="cursor-pointer" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button className={"cursor-pointer"} onClick={() => navigate("/")}>
          Back to Home Page
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
