"use client";

import { useQuery } from "@tanstack/react-query";

import useFieldCount from "../hooks/useFieldCount";
import useQueryLambda from "../hooks/useQueryLambda";

import { Grid } from "@tremor/react";

import { useRouter } from "next/navigation";

import BarListCard from "../components/BarListCard";
import UserSection from "./sections/UserSection";
import BracketSection from "./sections/BracketSection";

export default function Page() {
    const { getFieldCount } = useFieldCount();
    const { executeQuery } = useQueryLambda();

    const { data: artistCounts } = useQuery({
        queryKey: ["artistCounts"],
        queryFn: () => getFieldCount("artistName"),
        select: (data: any[]) => {
            if (data) {
                const newData = Array.from(
                    data,
                    (element: { fieldValue: string; num: number }) => {
                        const newElement: { value: number; name: string } = {
                            value: element.num,
                            name: element.fieldValue,
                        };
                        return newElement;
                    }
                );
                return newData;
            }
            return [];
        },
        staleTime: 60000,
    });

    const { data: playlistCounts } = useQuery({
        queryKey: ["playlistCounts"],
        queryFn: () => getFieldCount("playlistName"),
        select: (data) => {
            if (data) {
                const newData = Array.from(
                    data,
                    (element: { fieldValue: string; num: number }) => {
                        const newElement: { value: number; name: string } = {
                            value: element.num,
                            name: element.fieldValue,
                        };
                        return newElement;
                    }
                );
                return newData;
            }
            return [];
        },
        staleTime: 60000,
    });

    const { data: bracketsIn24h } = useQuery({
        queryKey: ["bracketsIn24h"],
        queryFn: () =>
            executeQuery("bracketsModifiedInMinutes", [
                {
                    name: "MinutesSinceModification",
                    type: "int",
                    value: "1440",
                },
            ]),
        staleTime: 60000,
    });

    const { data: bracketsIn72h } = useQuery({
        queryKey: ["bracketsIn72h"],
        queryFn: () =>
            executeQuery("bracketsModifiedInMinutes", [
                {
                    name: "MinutesSinceModification",
                    type: "int",
                    value: "4320",
                },
            ]),
        staleTime: 60000,
    });

    const { data: users } = useQuery({
        queryKey: ["users"],
        queryFn: () => executeQuery("usersByBracketNumber", []),
        staleTime: 60000,
    });

    return (
        <main className="px-12 py-12">
            <h1 className="text-3xl font-medium">Beat Bracket Stats</h1>
            <UserSection
                users={users}
                bracketsIn24h={bracketsIn24h}
                bracketsIn72h={bracketsIn72h}
            />
            <BracketSection
                bracketsIn24h={bracketsIn24h}
                bracketsIn72h={bracketsIn72h}
            />
            <Grid numItemsMd={2} className="mt-6 gap-6">
                <BarListCard
                    title={`Top Artists (${artistCounts?.length} unique)`}
                    data={artistCounts?.slice(0, 10) || []}
                    nameLabel="Artist"
                    valueLabel="Brackets"
                />
                <BarListCard
                    title={`Top Playlist Names (${playlistCounts?.length} unique)`}
                    data={playlistCounts?.slice(0, 10) || []}
                    nameLabel="Playlist Name"
                    valueLabel="Brackets"
                />
            </Grid>
            {/* <div className="mt-6">
                <KPIChart />
            </div> */}
        </main>
    );
}
