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

NEXTAUTH_SECRET=zX7U9lAq9CeS+hAvUPZuysl63GlZgPG60lrSEDkFQ/8=
NEXTAUTH_URL=http://localhost:3000

API_URL=http://localhost:8080/api