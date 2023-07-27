import PieChartCard from "./PieChart";

import { Card, Flex, Text, Title, Grid, Metric, Divider } from "@tremor/react";

import { bracketSizeType } from "../dashboard/page";

function convertObjectToPieChartData(obj: bracketSizeType) {
    console.log(obj);
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
    bracketsIn24hCount,
    bracketCompletionCounts,
    userCount,
}: {
    bracketSizeCounts?: bracketSizeType;
    bracketsIn24hCount?: number;
    bracketCompletionCounts?: { name: string; value: number }[];
    userCount?: number;
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
                    <Grid numItemsLg={2}>
                        <Card>
                            <Flex
                                flexDirection="row"
                                justifyContent="start"
                                alignItems="baseline"
                                className="gap-1"
                            >
                                <Metric>
                                    {bracketsIn24hCount}/
                                    {bracketSizeCounts.total}
                                </Metric>
                                <Text>recently modified</Text>
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
                                        bracketSizeCounts.total / userCount
                                    )}
                                </Metric>
                                <Text>brackets per user</Text>
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
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </Card>
    );
}
