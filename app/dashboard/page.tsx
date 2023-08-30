"use client";

import { useEffect, useState } from "react";

import { Callout, Grid } from "@tremor/react";

import { useRouter } from "next/navigation";

import KPIChart from "../components/KPIChart";

import KPICard from "../components/KPICard";

import { ExclamationIcon } from "@heroicons/react/solid";

import cx from "classnames";
import BarListCard from "../components/BarListCard";
import BracketCard from "../components/BracketCard";

import { baseUrl } from "../lib/utils";

export interface bracketSizeType {
    [key: string]: number;
}

export default function Page() {
    const router = useRouter();

    const [userCount, setUserCount] = useState<number | undefined>(undefined);
    const [bracketSizeCounts, setBracketSizeCounts] = useState<
        bracketSizeType | undefined
    >(undefined);
    const [bracketCompletionCounts, setBracketCompletionCounts] = useState<
        { value: number; name: string }[] | undefined
    >(undefined);

    const [usersIn24h, setUsersIn24h] = useState<string[] | undefined>(
        undefined
    );
    const [usersIn72h, setUsersIn72h] = useState<string[] | undefined>(
        undefined
    );
    const [bracketsIn24hCount, setBracketsIn24hCount] = useState<
        number | undefined
    >(undefined);
    const [artistList, setArtistList] = useState<
        { value: number; name: string }[]
    >([]);
    const [error, setError] = useState("");

    function processUsers(users: any) {
        let usersIn24hList = [];
        let usersIn72hList = [];
        let bracketsIn24h = 0;
        let bracketsIn72h = 0;
        let bracketsCompleted = 0;
        let brackets: bracketSizeType = {
            total: 0,
        };
        let artists: { value: number; name: string }[] = [];
        for (const userId of Object.keys(users)) {
            const user = users[userId];
            let userHasBracketModifiedIn24h = false;
            let userHasBracketModifiedIn72h = false;
            for (const bracket of user.brackets) {
                // increment brackets count
                brackets.total++;
                if (!brackets[bracket.tracks]) {
                    brackets[bracket.tracks] = 0;
                }
                brackets[bracket.tracks]++;

                // increment brackets in 24h count
                if (bracket.lastModifiedDate > Date.now() - 86400000) {
                    userHasBracketModifiedIn24h = true;
                    bracketsIn24h++;
                }

                // increment brackets in 72h count
                if (bracket.lastModifiedDate > Date.now() - 86400000 * 3) {
                    userHasBracketModifiedIn72h = true;
                    bracketsIn72h++;
                }

                // increment completed brackets count
                if (bracket.winner) {
                    bracketsCompleted++;
                }

                // add artist to artists object or increment count
                const artistName =
                    bracket.songSource && bracket.songSource.type === "artist"
                        ? bracket.songSource.artist.name
                        : bracket.artistName
                        ? bracket.artistName
                        : null;
                if (artistName) {
                    const artist = artists.find(
                        (artist) => artist.name === artistName
                    );
                    if (artist) {
                        artist.value++;
                    } else {
                        artists.push({ name: artistName, value: 1 });
                    }
                }
            }
            if (userHasBracketModifiedIn24h) {
                usersIn24hList.push(`${user.userName} (${userId})`);
            }
            if (userHasBracketModifiedIn72h) {
                usersIn72hList.push(`${user.userName} (${userId})`);
            }
        }

        // sort artist array
        artists.sort((a, b) => {
            if (a.value === b.value) {
                return 0;
            } else if (a.value < b.value) {
                return 1;
            } else {
                return -1;
            }
        });

        //limit array to 10 arists
        artists = artists.slice(0, 10);

        setUsersIn24h(usersIn24hList);
        setUsersIn72h(usersIn72hList);
        setUserCount(Object.keys(users).length);
        setArtistList(artists);
        setBracketsIn24hCount(bracketsIn24h);
        setBracketSizeCounts(brackets);
        setBracketCompletionCounts([
            { name: "Completed", value: bracketsCompleted },
            { name: "In Progress", value: brackets.total - bracketsCompleted },
        ]);
        console.log(artists);
    }

    useEffect(() => {
        fetch(`${baseUrl}/users`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else if (res.status === 403) {
                    setError("Not logged in");
                    router.push("/");
                    return;
                } else {
                    res.text().then((text) => {
                        console.log(text);
                        if (text) {
                            setError(text);
                            return;
                        } else {
                            setError("Error fetching users");
                            return;
                        }
                    });
                    return;
                }
            })
            .then((data) => {
                if (data) {
                    console.log(data);
                    processUsers(data);
                }
            });
    }, []);

    return (
        <main className="px-12 py-12">
            <h1 className="text-3xl font-medium">Beat Bracket Stats</h1>
            <Callout
                className={cx("mt-6", { hidden: !error })}
                title={error}
                color="rose"
                icon={ExclamationIcon}
            />
            <Grid numItemsMd={3} numItemsLg={3} className="mt-6 gap-6">
                <KPICard title="Users" metric={userCount} target={200} />
                <KPICard
                    title="Users in 24h"
                    metric={usersIn24h ? usersIn24h.length : usersIn24h}
                    accordionTitle="User List"
                    accordionData={usersIn24h}
                />
                <KPICard
                    title="Users in 72h"
                    metric={usersIn72h ? usersIn72h.length : usersIn72h}
                    accordionTitle="User List"
                    accordionData={usersIn72h}
                />
            </Grid>
            <Grid numItemsMd={2} className="mt-6 gap-6">
                <BarListCard
                    title="Top 10 Artists"
                    data={artistList}
                    nameLabel="Artist"
                    valueLabel="Brackets"
                />
                <BracketCard
                    bracketCompletionCounts={bracketCompletionCounts}
                    bracketSizeCounts={bracketSizeCounts}
                    bracketsIn24hCount={bracketsIn24hCount}
                    userCount={userCount}
                />
            </Grid>
            {/* <div className="mt-6">
                <KPIChart />
            </div> */}
        </main>
    );
}
