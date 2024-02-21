"use client";
import React, { createContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import rockset from "@rockset/client";
import { RocksetProvider } from "./context/rocksetContext";

export const RocksetContext = createContext(null);

// Create a client
const queryClient = new QueryClient();
const rocksetClient = rockset(
    process.env.NEXT_PUBLIC_ROCKSET_APIKEY || "",
    "https://api.use1a1.rockset.com"
);

export function RootWrapper({ children }: { children: React.ReactNode }) {
    return (
        <RocksetProvider rocksetClient={rocksetClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </RocksetProvider>
    );
}
