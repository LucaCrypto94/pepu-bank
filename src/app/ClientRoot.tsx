"use client";
import { ReactNode } from "react";
import dynamic from "next/dynamic";

const WalletProvider = dynamic(() => import("./WalletProvider"), { ssr: false });
 
export default function ClientRoot({ children }: { children: ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>;
} 