"use client";
import MainApp from "@/components/MainApp";
import useAppStore from "@/store/AppStore";
import fetchUserData from "@/utils/fetchUserData";
import { useEffect, useState } from "react";

export default function Home() {
  const { userId, setUserData, userData, setTeamId } = useAppStore();

  const getAppData = async () => {
    const userData = await fetchUserData(userId);
    const teamId = userData?.teams?.[0]?.teamId;
    setTeamId(teamId!);
    setUserData(userData!);
  };

  useEffect(() => {
    getAppData();
  }, []);

  return userData && <MainApp />;
}
