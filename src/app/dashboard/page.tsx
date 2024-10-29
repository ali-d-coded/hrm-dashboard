import { getQrCodes } from "@/actions/qrcode";
import RealtimeQRCodes from "@/components/dashboard/attendance/RealtimeQrCodes";
import { DynamicData } from "@/lib/contants";
import React from "react";

export default async function Dashboard() {
  const qrs: DynamicData[] = (await getQrCodes()) || [];

  return (
    <div className="">
      <RealtimeQRCodes initialQRCodes={qrs} />
    </div>
  );
}
