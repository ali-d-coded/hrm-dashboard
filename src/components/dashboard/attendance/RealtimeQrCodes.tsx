"use client";

import { useState, useEffect, useRef } from "react";
import { QRCode } from "antd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { DynamicData } from "@/lib/contants";
import PocketBase from "pocketbase";

// Initialize PocketBase
const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

interface QRCodeItem {
  id: string;
  mode: string;
  qr_code_text: string;
}

interface RealtimeQRCodesProps {
  initialQRCodes: QRCodeItem[] | DynamicData[];
  collection: string;
}

function isQRCodeItem(item: DynamicData | QRCodeItem): item is QRCodeItem {
  return typeof item.id === "string" && typeof item.qr_code_text === "string";
}

const QRCodeWithAnimation = ({
  value,
  size,
}: {
  value: string;
  size: number;
}) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{
      scale: 1,
      opacity: 1,
    }}
    exit={{ scale: 0.8, opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="relative"
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-blue-500/10 rounded-lg"
      style={{ filter: "blur(20px)", transform: "translate(-4px, -4px)" }}
    />
    <QRCode value={value} size={size} />
    <motion.div
      initial={{ scale: 1.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 border-2 border-blue-500/30 rounded-lg"
    />
  </motion.div>
);

export default function RealtimeQRCodes({
  initialQRCodes,
  collection,
}: RealtimeQRCodesProps) {
  const [isCheckIn, setIsCheckIn] = useState(true);
  const [qrCodes, setQRCodes] = useState(initialQRCodes);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const prevQRTextRef = useRef<string>("");

  useEffect(() => {
    const unsubscribe = pb.collection(collection).subscribe("*", async (e) => {
      try {
        setIsUpdating(true);
        switch (e.action) {
          case "create":
            //@ts-expect-error jdhgdjgdjhsagjhas
            setQRCodes((prevCodes) => [...prevCodes, e.record]);
            break;
          case "update":
            //@ts-expect-error fsdfjjhsdjfhsdkj
            setQRCodes((prevCodes) =>
              prevCodes.map((code) =>
                code.id === e.record.id ? e.record : code
              )
            );
            break;
          case "delete":
            //@ts-expect-error sdfjhsdfhgds
            setQRCodes((prevCodes) =>
              prevCodes.filter((code) => code.id !== e.record.id)
            );
            break;
        }

        // Add a small delay to make the animation noticeable
        await new Promise((resolve) => setTimeout(resolve, 100));
        setIsUpdating(false);
      } catch (err) {
        console.error("Error processing realtime update:", err);
        setIsUpdating(false);
      }
    });

    return () => {
      //@ts-expect-error fjdfjksfhsdlkj
      unsubscribe();
    };
  }, [collection]);

  const checkInQR = qrCodes.find((qr) => qr.mode === "check_in") || qrCodes[0];
  const checkOutQR =
    qrCodes.find((qr) => qr.mode === "check_out") || qrCodes[1];
  const currentQR = isCheckIn ? checkInQR : checkOutQR;

  // Update prevQRTextRef when QR changes
  useEffect(() => {
    if (isQRCodeItem(currentQR)) {
      prevQRTextRef.current = currentQR.qr_code_text;
    }
  }, [currentQR]);

  if (loading) {
    return (
      <div className="container py-8 px-4">
        <Card className="max-w-md">
          <CardContent className="flex items-center justify-center h-64">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Loading...
            </motion.div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 px-4">
      <Card className="max-w-md">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="text-2xl font-bold text-center">
              {isCheckIn ? "Check In" : "Check Out"} QR Code
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-500 mt-2"
                >
                  {error}
                </motion.div>
              )}
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <AnimatePresence mode="wait">
            {isQRCodeItem(currentQR) && (
              <motion.div
                key={`${currentQR.id}-${isUpdating}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <QRCodeWithAnimation
                  value={currentQR.qr_code_text}
                  size={250}
                />
                {isUpdating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                  >
                    <div className="text-sm text-blue-600">Updating...</div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={() => setIsCheckIn(!isCheckIn)}
              className="w-full max-w-xs"
              disabled={isUpdating}
            >
              Switch to {isCheckIn ? "Check Out" : "Check In"}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
