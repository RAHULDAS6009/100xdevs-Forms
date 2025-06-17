"use client";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function useAuth() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/");
    } else {
      redirect("/dashboard");
    }
  }, []);
  //rest logic
  // return false;
}
