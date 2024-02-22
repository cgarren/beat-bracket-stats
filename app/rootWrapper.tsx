"use client";
import { useState } from "react";
import {
    QueryClient,
    QueryClientProvider,
    QueryCache,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Callout } from "@tremor/react";
import { ExclamationIcon } from "@heroicons/react/solid";

export function RootWrapper({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [error, setError] = useState("");

    // Create a client
    const queryClient = new QueryClient({
        queryCache: new QueryCache({
            onError: (error: Error) => {
                console.warn(error);
                if (error?.cause === 403) {
                    router.push("/");
                } else if (error?.message) {
                    setError(error.message);
                } else {
                    setError("Unknown error occured");
                }
            },
        }),
        defaultOptions: { queries: { retry: false } },
    });
    return (
        <QueryClientProvider client={queryClient}>
            {error && (
                <Callout
                    className="mt-6"
                    title={error}
                    color="rose"
                    icon={ExclamationIcon}
                />
            )}
            {children}
        </QueryClientProvider>
    );
}
