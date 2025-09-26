import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function AuthLayout({ children, authentication = true }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.user.authStatus);

  console.log(authStatus, authentication);

  useEffect(() => {
    if (authentication && authStatus != authentication) {
      navigate("/login");
    } else if (!authentication && authStatus != authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [authentication, authStatus, navigate]);

  return loading ? (
    <div className="h-screen w-screen flex justify-center items-center bg-zinc-950">
      <div className="loader"></div>
    </div>
  ) : (
    <>{children}</>
  );
}

export default AuthLayout;
