import PieChartCard from "./PieChart";

import { Card, Flex, Text, Title, Grid, Metric, Divider } from "@tremor/react";

import { fieldCountType } from "../hooks/useFieldCount";

function convertObjectToPieChartData(obj: fieldCountType) {
    const data = [];
    for (const key of Object.keys(obj)) {
        if (key === "total") continue;
        data.push({
            name: key + " tracks",
            value: obj[key],
        });
    }
    return data;
}

export default function BracketPieChart({
    bracketSizeCounts,
    bracketCount,
    bracketsIn24hCount,
    bracketCompletionCounts,
    userCount,
    templateCount,
}: {
    bracketSizeCounts?: fieldCountType;
    bracketCount?: number;
    bracketsIn24hCount?: number;
    bracketCompletionCounts?: { name: string; value: number }[];
    userCount?: number;
    templateCount?: number;
}) {
    return (
        <Card>
            <Title className="mb-2">Brackets</Title>
            {bracketSizeCounts &&
            bracketSizeCounts.total &&
            (bracketsIn24hCount || bracketsIn24hCount === 0) &&
            bracketCompletionCounts &&
            userCount ? (
                <>
                    <Grid numItemsLg={3}>
                        <Card>
                            <Flex
                                flexDirection="row"
                                justifyContent="start"
                                alignItems="baseline"
                                className="gap-1"
                            >
                                <Metric>{templateCount}</Metric>
                                <Text>templates</Text>
                            </Flex>
                        </Card>
                        <Card>
                            <Flex
                                flexDirection="row"
                                justifyContent="start"
                                alignItems="baseline"
                                className="gap-1"
                            >
                                <Metric>{bracketCount}</Metric>
                                <Text>brackets</Text>
                            </Flex>
                        </Card>
                        <Card>
                            <Flex
                                flexDirection="row"
                                justifyContent="start"
                                alignItems="baseline"
                                className="gap-1"
                            >
                                <Metric>{bracketsIn24hCount}</Metric>
                                <Text>recently modified</Text>
                            </Flex>
                        </Card>
                    </Grid>
                    <Card>
                        <Grid numItemsLg={2} numItemsSm={1}>
                            <PieChartCard
                                title="Bracket Size"
                                nameLabel="name"
                                valueLabel="value"
                                data={
                                    bracketSizeCounts
                                        ? convertObjectToPieChartData(
                                              bracketSizeCounts
                                          )
                                        : bracketSizeCounts
                                }
                                //colors={["green", "blue", "orange", "red"]}
                            ></PieChartCard>
                            <PieChartCard
                                title="Bracket Completion"
                                data={bracketCompletionCounts}
                                nameLabel="name"
                                valueLabel="value"
                                colors={["green", "yellow"]}
                            />
                        </Grid>
                    </Card>
                    <Grid numItemsLg={2}>
                        <Card>
                            <Flex
                                flexDirection="row"
                                justifyContent="start"
                                alignItems="baseline"
                                className="gap-1"
                            >
                                <Metric>
                                    {(
                                        bracketSizeCounts.total / userCount
                                    ).toFixed(2)}
                                </Metric>
                                <Text>brackets per user</Text>
                            </Flex>
                        </Card>
                        <Card>
                            <Flex
                                flexDirection="row"
                                justifyContent="start"
                                alignItems="baseline"
                                className="gap-1"
                            >
                                <Metric>
                                    {Math.round(
                                        (bracketCompletionCounts[0].value /
                                            bracketSizeCounts.total) *
                                            100
                                    ) + "%"}
                                </Metric>
                                <Text>completed</Text>
                            </Flex>
                        </Card>
                    </Grid>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </Card>
    );
}
