import { Card, Flex, Text, Bold, Title, BarList } from "@tremor/react";

export default function BarListCard({
    title,
    nameLabel,
    valueLabel,
    data,
}: {
    title: string;
    nameLabel: string;
    valueLabel: string;
    data: { name: string; value: number }[];
}) {
    return (
        <Card>
            <Title className="mb-2">{title}</Title>
            {data?.length !== 0 ? (
                <>
                    <Flex className="mt-4">
                        <Text>
                            <Bold>{nameLabel}</Bold>
                        </Text>
                        <Text>
                            <Bold>{valueLabel}</Bold>
                        </Text>
                    </Flex>
                    <BarList data={data} className="mt-2" />
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </Card>
    );
}
