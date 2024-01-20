"use client";
import MainApp from "@/components/MainApp";
import useAppStore from "@/store/AppStore";
import fetchUserData from "@/utils/fetchUserData";
import getUserId from "@/utils/getUserId";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const { setUserData, userData, setTeamId } = useAppStore();

  const getAppData = async () => {
    const userData = await fetchUserData();
    const teamId = userData?.teams?.[0]?.teamId;
    setTeamId(teamId!);
    setUserData(userData!);
  };

  useEffect(() => {
    getAppData();
  }, []);

  return userData && <MainApp />;
}
