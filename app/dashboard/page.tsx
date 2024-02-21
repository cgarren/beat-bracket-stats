"use client";

import { useMemo, useState, useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { RocksetContext } from "../context/rocksetContext";
import useFieldCount, { fieldCountType } from "../hooks/useFieldCount";
import useQueryLambda from "../hooks/useQueryLambda";

import { Callout, Grid } from "@tremor/react";

import { useRouter } from "next/navigation";

import KPIChart from "../components/KPIChart";

import KPICard from "../components/KPICard";

import { ExclamationIcon } from "@heroicons/react/solid";

import cx from "classnames";
import BarListCard from "../components/BarListCard";
import BracketCard from "../components/BracketCard";

import { baseUrl } from "../lib/utils";

export default function Page() {
    const router = useRouter();
    const rocksetClient = useContext(RocksetContext);
    const { getFieldCount, processFieldCount } = useFieldCount();
    const { executeQuery } = useQueryLambda();

    const { data: artistCounts } = useQuery({
        queryKey: ["artistCounts"],
        queryFn: () => getFieldCount("artistName"),
        select: (data) => {
            if (data) {
                const newData = Array.from(
                    data.slice(0, 10),
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
        enabled: Boolean(rocksetClient),
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
        enabled: Boolean(rocksetClient),
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
        enabled: Boolean(rocksetClient),
        staleTime: 60000,
    });

    const { data: users } = useQuery({
        queryKey: ["users"],
        queryFn: () => executeQuery("usersByBracketNumber", []),
        enabled: Boolean(rocksetClient),
        staleTime: 60000,
    });

    const { data: bracketSizeCounts } = useQuery({
        queryKey: ["bracketSizeCounts"],
        queryFn: () => getFieldCount("size"),
        select: (data) => processFieldCount(data),
        enabled: Boolean(rocksetClient),
        staleTime: 60000,
    });

    const { data: winners } = useQuery({
        queryKey: ["winners"],
        queryFn: () => getFieldCount("winner"),
        select: (data) => processFieldCount(data),
        enabled: Boolean(rocksetClient),
        staleTime: 60000,
    });

    const { data: templates } = useQuery({
        queryKey: ["templates"],
        queryFn: () => executeQuery("templates", []),
        enabled: Boolean(rocksetClient),
        staleTime: 60000,
    });

    const bracketCount = bracketSizeCounts?.total;

    const templateCount = templates?.length;

    const bracketCompletionCounts = [
        { name: "Completed", value: winners?.total || 0 },
        {
            name: "In Progress",
            value:
                bracketCount && winners?.total
                    ? bracketCount - winners.total
                    : 0,
        },
    ];

    const usersIn24h = useMemo(() => {
        if (!bracketsIn24h) {
            return;
        }
        const users: string[] = [];
        for (const bracket of bracketsIn24h) {
            if (
                bracket.ownerUsername &&
                !users.includes(bracket.ownerUsername)
            ) {
                users.push(bracket.ownerUsername);
            }
        }
        return users;
    }, [bracketsIn24h]);

    const usersIn72h = useMemo(() => {
        if (!bracketsIn72h) {
            return;
        }
        const users: string[] = [];
        for (const bracket of bracketsIn72h) {
            if (
                bracket.ownerUsername &&
                !users.includes(bracket.ownerUsername)
            ) {
                users.push(bracket.ownerUsername);
            }
        }
        return users;
    }, [bracketsIn72h]);

    const bracketsIn24hCount = bracketsIn24h?.length;

    const userCount = users?.length;

    const [error, setError] = useState("");

    // function processUsers(bracketUsers: any, templateUsers: any) {
    //     let usersIn24hList = [];
    //     let usersIn72hList = [];
    //     let bracketsIn24h = 0;
    //     let bracketsIn72h = 0;
    //     let bracketsCompleted = 0;
    //     // let templates: fieldCountType = {
    //     //     total: 0,
    //     // };
    //     let brackets = 0;
    //     let artists: { value: number; name: string }[] = [];
    //     for (const userId of Object.keys(bracketUsers)) {
    //         const bracketUser = bracketUsers[userId];
    //         const templateUser = templateUsers[userId];
    //         let userHasBracketModifiedIn24h = false;
    //         let userHasBracketModifiedIn72h = false;

    //         if (templateUser && templateUser.items) {
    //             for (const template of templateUser.items) {
    //                 // templates.total++;
    //                 // if (!templates[template.tracks]) {
    //                 //     templates[template.tracks] = 0;
    //                 // }
    //                 // templates[template.tracks]++;

    //                 // add artist to artists object or increment count
    //                 const artistName =
    //                     template.songSource &&
    //                     template.songSource.type === "artist"
    //                         ? template.songSource.artist.name
    //                         : null;
    //                 if (artistName) {
    //                     const artist = artists.find(
    //                         (artist) => artist.name === artistName
    //                     );
    //                     if (artist) {
    //                         artist.value++;
    //                     } else {
    //                         artists.push({ name: artistName, value: 1 });
    //                     }
    //                 }
    //             }
    //         } else {
    //             console.log(
    //                 `no templates for user ${userId}. brackets:`,
    //                 bracketUser,
    //                 "templates:",
    //                 templateUser
    //             );
    //         }

    //         if (!bracketUser || !bracketUser.items) {
    //             console.log(`no bracket user for ${userId}`);
    //             continue;
    //         }

    //         for (const bracket of bracketUser.items) {
    //             // increment brackets count
    //             brackets++;

    //             // increment brackets in 24h count
    //             if (bracket.lastModified > Date.now() - 86400000) {
    //                 userHasBracketModifiedIn24h = true;
    //                 bracketsIn24h++;
    //             }

    //             // increment brackets in 72h count
    //             if (bracket.lastModified > Date.now() - 86400000 * 3) {
    //                 userHasBracketModifiedIn72h = true;
    //                 bracketsIn72h++;
    //             }

    //             // increment completed brackets count
    //             if (bracket.winner) {
    //                 bracketsCompleted++;
    //             }
    //         }
    //         if (userHasBracketModifiedIn24h) {
    //             usersIn24hList.push(
    //                 `${bracketUser.userName} (${userId}, ${bracketUser.items.length} brackets)`
    //             );
    //         }
    //         if (userHasBracketModifiedIn72h) {
    //             usersIn72hList.push(
    //                 `${bracketUser.userName} (${userId}, ${bracketUser.items.length} brackets)`
    //             );
    //         }
    //     }

    //     // sort artist array
    //     artists.sort((a, b) => {
    //         if (a.value === b.value) {
    //             return 0;
    //         } else if (a.value < b.value) {
    //             return 1;
    //         } else {
    //             return -1;
    //         }
    //     });

    //     //limit array to 10 arists
    //     artists = artists.slice(0, 10);

    //     setUsersIn24h(usersIn24hList);
    //     setUsersIn72h(usersIn72hList);
    //     setUserCount(Object.keys(bracketUsers).length);
    //     // setArtistList(artists);
    //     setBracketsIn24hCount(bracketsIn24h);
    //     // setBracketCount(brackets);
    //     // setTemplateSizeCounts(templates);
    //     setBracketCompletionCounts([
    //         { name: "Completed", value: bracketsCompleted },
    //         { name: "In Progress", value: brackets - bracketsCompleted },
    //     ]);
    //     console.log(artists);
    // }

    // useEffect(() => {
    //     return;
    //     Promise.all([
    //         fetch(`${baseUrl}/users?type=bracket`, {
    //             method: "GET",
    //             credentials: "include",
    //         }),
    //         fetch(`${baseUrl}/users?type=template`, {
    //             method: "GET",
    //             credentials: "include",
    //         }),
    //     ])
    //         .then(([bracketRes, templateRes]) => {
    //             if (bracketRes.status === 200 && templateRes.status === 200) {
    //                 return Promise.all([bracketRes.json(), templateRes.json()]);
    //             } else if (
    //                 bracketRes.status === 403 &&
    //                 templateRes.status === 403
    //             ) {
    //                 setError("Not logged in");
    //                 router.push("/");
    //                 return;
    //             } else {
    //                 bracketRes.text().then((text) => {
    //                     console.log(text);
    //                     if (text) {
    //                         setError(text);
    //                         return;
    //                     } else {
    //                         setError("Error fetching users");
    //                         return;
    //                     }
    //                 });
    //                 return;
    //             }
    //         })
    //         .then((data) => {
    //             if (data) {
    //                 const [bracketData, templateData] = data;
    //                 processUsers(bracketData, templateData);
    //             }
    //         });
    // }, []);

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
                <KPICard title="Users" metric={userCount} target={1000} />
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
                    data={artistCounts || []}
                    nameLabel="Artist"
                    valueLabel="Brackets"
                />
                <BracketCard
                    bracketCompletionCounts={bracketCompletionCounts}
                    bracketSizeCounts={bracketSizeCounts}
                    // bracketSongSourceCounts={{}}
                    bracketCount={bracketCount}
                    bracketsIn24hCount={bracketsIn24hCount}
                    userCount={userCount}
                    templateCount={templateCount}
                />
            </Grid>
            {/* <div className="mt-6">
                <KPIChart />
            </div> */}
        </main>
    );
}
