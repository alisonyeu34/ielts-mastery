"use client";

import React, { useEffect } from "react";
import { initDefaultUserData } from "@/lib/db";

export function DBProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initDefaultUserData();
  }, []);

  return <>{children}</>;
}
