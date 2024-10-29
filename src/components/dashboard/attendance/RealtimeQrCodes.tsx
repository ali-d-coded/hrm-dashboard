"use client";

import { useState } from "react";
import { QRCode } from "antd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { DynamicData } from "@/lib/contants";

interface QRCodeItem {
  id: string;
  mode: string;
  qr_code_text: string;
}

interface RealtimeQRCodesProps {
  initialQRCodes: QRCodeItem[] | DynamicData[];
}

function isQRCodeItem(item: DynamicData | QRCodeItem): item is QRCodeItem {
  return typeof item.id === "string" && typeof item.qr_code_text === "string";
}
export default function RealtimeQRCodes({
  initialQRCodes,
}: RealtimeQRCodesProps) {
  const [isCheckIn, setIsCheckIn] = useState(true);
  console.log({ initialQRCodes });

  const checkInQR =
    initialQRCodes.find((qr) => qr.mode === "check_in") || initialQRCodes[0];
  const checkOutQR =
    initialQRCodes.find((qr) => qr.mode === "check_out") || initialQRCodes[1];

  const currentQR = isCheckIn ? checkInQR : checkOutQR;

  return (
    <div className="container py-8 px-4">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {isCheckIn ? "Check In" : "Check Out"} QR Code
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <AnimatePresence mode="wait">
            {isQRCodeItem(currentQR) && (
              <motion.div
                key={currentQR.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QRCode value={currentQR.qr_code_text} size={250} />
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            onClick={() => setIsCheckIn(!isCheckIn)}
            className="w-full max-w-xs"
          >
            Switch to {isCheckIn ? "Check Out" : "Check In"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
