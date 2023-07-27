import {
    Card,
    Flex,
    Text,
    Title,
    BadgeDelta,
    Metric,
    ProgressBar,
    DeltaType,
} from "@tremor/react";

export default function KPICard({
    title,
    metric,
    deltaType,
    delta,
    target,
}: {
    title: string;
    metric?: number;
    deltaType?: DeltaType;
    delta?: number;
    target?: number;
}) {
    const progress =
        metric && target
            ? Math.round((metric / Number(target)) * 100)
            : undefined;
    return (
        <Card key={title}>
            <Flex alignItems="start">
                <div className="truncate">
                    <Title className="mb-2">{title}</Title>
                    {metric || metric === 0 ? (
                        <Metric className="truncate">{metric}</Metric>
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </div>
                {delta && deltaType ? (
                    <BadgeDelta deltaType={deltaType}>{delta}</BadgeDelta>
                ) : null}
            </Flex>
            {progress && progress >= 0 && target ? (
                <>
                    <Flex className="mt-2 space-x-2">
                        <Text className="truncate">{`${progress}% (${metric})`}</Text>
                        <Text>{target}</Text>
                    </Flex>
                    <ProgressBar value={progress} className="mt-2" />
                </>
            ) : null}
        </Card>
    );
}
