"use client";

import { Button, Card, Title } from "@tremor/react";
import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";

const baseUrl: any = process.env.NEXT_PUBLIC_BACKEND_HOST;

export default function Page() {
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = useCallback((e: any) => {
        e.preventDefault();
        setShowError(false);
        setLoading(true);
        const username = e.target.username.value;
        const password = e.target.password.value;
        if (!username || !password) {
            return;
        }
        fetch(`${baseUrl}/auth`, {
            method: "POST",
            headers: {
                Authorization: "Basic " + btoa(username + ":" + password),
            },
            credentials: "include",
        }).then((res) => {
            if (res.status !== 200) {
                setShowError(true);
                setLoading(false);
                return;
            }
            router.push("/dashboard");
        });
    }, []);

    return (
        <main className="flex flex-col text-center h-screen relative">
            <Title className="mt-5">Beat Bracket Stats</Title>
            <Card className="max-w-md mx-auto my-auto">
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <Title>Sign in</Title>
                    <input
                        type="username"
                        name="username"
                        id="username"
                        autoComplete="username"
                        required={true}
                        className="appearance-none min-w-0 w-full bg-white border-transparent ring-tremor rounded-lg shadow-sm py-2 px-4 text-base text-slate-900 placeholder-slate-500 transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:placeholder-slate-400"
                        placeholder="Enter your username"
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        required={true}
                        className="appearance-none min-w-0 w-full bg-white border-transparent ring-tremor rounded-lg shadow-sm py-2 px-4 text-base text-slate-900 placeholder-slate-500 transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:placeholder-slate-400"
                        placeholder="Enter your password"
                    />
                    <Button
                        loading={loading}
                        loadingText="Signing in..."
                        variant="primary"
                        color="blue"
                        disabled={loading}
                    >
                        Sign in
                    </Button>
                    <div className="text-red-500" hidden={!showError}>
                        Invalid credentials
                    </div>
                </form>
            </Card>
        </main>
    );
}
