import React, { useMemo } from "react";

import useFieldCount from "@/app/hooks/useFieldCount";
import useQueryLambda from "@/app/hooks/useQueryLambda";

import { useQuery } from "@tanstack/react-query";

import KPICard from "@/app/components/KPICard";
import PieChartCard, {
    convertObjectToPieChartData,
} from "@/app/components/PieChart";
import Section from "./Section";

export default function BracketSection({
    bracketsIn24h,
    bracketsIn72h,
}: {
    bracketsIn24h: any;
    bracketsIn72h: any;
}) {
    const { getFieldCount, processFieldCount } = useFieldCount();
    const { executeQuery } = useQueryLambda();

    const { data: sizeCounts } = useQuery({
        queryKey: ["sizeCounts"],
        queryFn: () => getFieldCount("size"),
        select: (data) => processFieldCount(data),
        staleTime: 60000,
    });

    const { data: seedingMethodCounts } = useQuery({
        queryKey: ["seedingMethodCounts"],
        queryFn: () => getFieldCount("seedingMethod"),
        select: (data) => processFieldCount(data),
        staleTime: 60000,
    });

    const { data: inclusionMethodCounts } = useQuery({
        queryKey: ["inclusionMethodCounts"],
        queryFn: () => getFieldCount("inclusionMethod"),
        select: (data) => processFieldCount(data),
        staleTime: 60000,
    });

    const { data: songSourceTypeCounts } = useQuery({
        queryKey: ["songSourceTypeCounts"],
        queryFn: () => getFieldCount("songSourceType"),
        select: (data) => processFieldCount(data),
        staleTime: 60000,
    });

    const { data: winners } = useQuery({
        queryKey: ["winners"],
        queryFn: () => getFieldCount("winner"),
        select: (data) => processFieldCount(data),
        staleTime: 60000,
    });

    const { data: templates } = useQuery({
        queryKey: ["templates"],
        queryFn: () => executeQuery("templates", []),
        staleTime: 60000,
    });

    const bracketCount = sizeCounts?.total;

    const templateCount = templates?.length;

    const bracketCompletionCounts =
        bracketCount && winners?.total
            ? {
                  Completed: winners.total,
                  "In Progress": bracketCount - winners.total,
              }
            : undefined;

    return (
        <Section SectionName="Brackets" colClassNames="grid-cols-1">
            <div className="grid sm:grid-cols-3 gap-6">
                <KPICard
                    title="Brackets"
                    metric={bracketCount}
                    secondaryMetric={templateCount}
                    secondaryLabel="templates"
                />
                {/* <KPICard title="Templates" metric={templateCount} /> */}
                <KPICard
                    title="Brackets modified in 24h"
                    metric={bracketsIn24h?.length}
                />
                <KPICard
                    title="Brackets modified in 72h"
                    metric={bracketsIn72h?.length}
                />
            </div>
            <h3 className=" text-xl font-medium">Bracket Makeup</h3>
            <div className="grid xl-grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 gap-6">
                <PieChartCard
                    title="Size"
                    nameLabel="name"
                    valueLabel="value"
                    data={
                        sizeCounts
                            ? convertObjectToPieChartData(sizeCounts)
                            : sizeCounts
                    }
                    // colors={["green", "blue", "orange", "red"]}
                />
                <PieChartCard
                    title="Song Source Type"
                    nameLabel="name"
                    valueLabel="value"
                    data={
                        songSourceTypeCounts
                            ? convertObjectToPieChartData(songSourceTypeCounts)
                            : songSourceTypeCounts
                    }
                    //colors={["green", "blue", "orange", "red"]}
                />
                <PieChartCard
                    title="Seeding Method"
                    nameLabel="name"
                    valueLabel="value"
                    data={
                        seedingMethodCounts
                            ? convertObjectToPieChartData(seedingMethodCounts)
                            : seedingMethodCounts
                    }
                    //colors={["green", "blue", "orange", "red"]}
                />
                <PieChartCard
                    title="Inclusion Method"
                    nameLabel="name"
                    valueLabel="value"
                    data={
                        inclusionMethodCounts
                            ? convertObjectToPieChartData(inclusionMethodCounts)
                            : inclusionMethodCounts
                    }
                    //colors={["green", "blue", "orange", "red"]}
                />
                <PieChartCard
                    title="Bracket Completion"
                    data={
                        bracketCompletionCounts
                            ? convertObjectToPieChartData(
                                  bracketCompletionCounts
                              )
                            : bracketCompletionCounts
                    }
                    nameLabel="name"
                    valueLabel="value"
                    colors={["green", "yellow"]}
                    extraMetric={`${
                        bracketCount &&
                        bracketCompletionCounts?.Completed &&
                        Math.round(
                            (bracketCompletionCounts.Completed / bracketCount) *
                                100
                        )
                    }%`}
                />
            </div>
        </Section>
    );
}
