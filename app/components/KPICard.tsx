import {
    Card,
    Flex,
    Text,
    Title,
    BadgeDelta,
    Metric,
    ProgressBar,
    DeltaType,
    Accordion,
    AccordionHeader,
    AccordionBody,
    List,
    ListItem,
} from "@tremor/react";

export default function KPICard({
    title,
    metric,
    deltaType,
    delta,
    target,
    accordionData,
    accordionTitle,
}: {
    title: string;
    metric?: number;
    deltaType?: DeltaType;
    delta?: number;
    target?: number;
    accordionData?: string[];
    accordionTitle?: string;
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
            {accordionData && accordionTitle ? (
                <Accordion className="mt-4">
                    <AccordionHeader>
                        <div className="space-y-2">
                            <Text>{accordionTitle}</Text>
                        </div>
                    </AccordionHeader>
                    <AccordionBody>
                        <List className="mt-2">
                            {accordionData.map((item) => (
                                <ListItem key={item}>{item}</ListItem>
                            ))}
                        </List>
                    </AccordionBody>
                </Accordion>
            ) : null}
        </Card>
    );
}
