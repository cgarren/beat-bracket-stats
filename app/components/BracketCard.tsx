import PieChartCard from "./PieChart";

import { Card, Flex, Text, Title, Grid, Metric, Divider } from "@tremor/react";

import { templateSizeType } from "../dashboard/page";

function convertObjectToPieChartData(obj: templateSizeType) {
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
    templateSizeCounts,
    bracketCount,
    bracketsIn24hCount,
    bracketCompletionCounts,
    userCount,
}: {
    templateSizeCounts?: templateSizeType;
    bracketCount?: number;
    bracketsIn24hCount?: number;
    bracketCompletionCounts?: { name: string; value: number }[];
    userCount?: number;
}) {
    return (
        <Card>
            <Title className="mb-2">Brackets</Title>
            {templateSizeCounts &&
            templateSizeCounts.total &&
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
                                <Metric>{templateSizeCounts.total}</Metric>
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
                                    templateSizeCounts
                                        ? convertObjectToPieChartData(
                                              templateSizeCounts
                                          )
                                        : templateSizeCounts
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
                                        templateSizeCounts.total / userCount
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
                                            templateSizeCounts.total) *
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
