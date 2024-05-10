import { Text, DonutChart, Legend, Color, Title, Card } from "@tremor/react";

import { fieldCountType } from "../hooks/useFieldCount";

export function convertObjectToPieChartData(
    obj: fieldCountType,
    descriptor?: string
) {
    const data = [];
    for (const key of Object.keys(obj)) {
        if (key === "total") continue;
        data.push({
            name: key + (descriptor ? ` ${descriptor}` : ""),
            value: obj[key],
        });
    }
    return data;
}

export default function PieChart({
    title,
    nameLabel,
    valueLabel,
    data,
    children,
    colors = [
        "red",
        "purple",
        "blue",
        "yellow",
        "green",
        "orange",
        "cyan",
        "indigo",
        "gray",
    ],
    extraMetric,
}: {
    title?: string;
    nameLabel: string;
    valueLabel: string;
    data?: { name: string; value: number }[];
    children?: React.ReactNode;
    colors?: Color[];
    extraMetric?: string;
}) {
    console.log(
        data?.map((data) => `${data.name}`),
        colors
    );
    return (
        <Card>
            <div className="flex flex-col items-start justify-between h-full">
                {title && <Title>{title}</Title>}
                {data && data.length !== 0 ? (
                    <>
                        <Legend
                            categories={data.map((data) => `${data.name}`)}
                            // colors={colors}
                            className="mt-6 justify-center"
                        />
                        <DonutChart
                            variant={extraMetric ? "donut" : "pie"}
                            className="mt-6"
                            data={data}
                            category={valueLabel}
                            index={nameLabel}
                            // colors={colors}
                            label={extraMetric}
                        />
                    </>
                ) : (
                    <Text>Loading...</Text>
                )}
            </div>

            {children}
        </Card>
    );
}
