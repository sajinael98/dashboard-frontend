"use client";

import { Suspense, useEffect } from "react";

import { WelcomePage } from "@refinedev/core";
import { axiosInstance } from "@refinedev/simple-rest";

export default function IndexPage() {
  useEffect(()=>{
    axiosInstance.get("/backend-api/sys-auth/auth")
  },[])
  return (
    <Suspense>
      <WelcomePage />
    </Suspense>
  );
}
