"use client";

import { useEffect } from "react";

import {
    Card,
    Grid,
    Title,
    Text,
    BadgeDelta,
    DeltaType,
    Flex,
    Metric,
    ProgressBar,
} from "@tremor/react";

import KPIChart from "../components/KPIChart";

const baseUrl: any = process.env.NEXT_PUBLIC_BACKEND_HOST;

type Kpi = {
    title: string;
    metric: string;
    progress: number;
    target: string;
    delta: string;
    deltaType: DeltaType;
};

const kpiData: Kpi[] = [
    {
        title: "Users",
        metric: "$ 45,564",
        progress: 36.5,
        target: "$ 125,000",
        delta: "23.9%",
        deltaType: "increase",
    },
    {
        title: "Brackets",
        metric: "$ 12,699",
        progress: 15.9,
        target: "$ 80,000",
        delta: "13.2%",
        deltaType: "moderateIncrease",
    },
    {
        title: "Brackets in last 24h",
        metric: "1,072",
        progress: 53.6,
        target: "2,000",
        delta: "10.1%",
        deltaType: "moderateDecrease",
    },
];

export default function Page() {
    useEffect(() => {
        fetch(`${baseUrl}/users`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    }, []);

    return (
        <main className="px-12 py-12">
            <Title>Beat Bracket Stats</Title>
            <Grid numItemsLg={3} className="mt-6 gap-6">
                {kpiData.map((item) => (
                    <Card key={item.title}>
                        <Flex alignItems="start">
                            <div className="truncate">
                                <Text>{item.title}</Text>
                                <Metric className="truncate">
                                    {item.metric}
                                </Metric>
                            </div>
                            <BadgeDelta deltaType={item.deltaType}>
                                {item.delta}
                            </BadgeDelta>
                        </Flex>
                        <Flex className="mt-4 space-x-2">
                            <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text>
                            <Text>{item.target}</Text>
                        </Flex>
                        <ProgressBar value={item.progress} className="mt-2" />
                    </Card>
                ))}
            </Grid>
            <div className="mt-6">
                <KPIChart />
            </div>
        </main>
    );
}
