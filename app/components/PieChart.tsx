import { Flex, Text, DonutChart, Legend, Color, Title } from "@tremor/react";

export default function PieChart({
    title,
    nameLabel,
    valueLabel,
    data,
    children,
    colors = ["red", "purple", "blue", "yellow", "green", "gray"],
}: {
    title?: string;
    nameLabel: string;
    valueLabel: string;
    data?: { name: string; value: number }[];
    children?: React.ReactNode;
    colors?: Color[];
}) {
    return (
        <>
            {data && data.length !== 0 ? (
                <Flex
                    flexDirection="col"
                    justifyContent="between"
                    alignItems="center"
                >
                    {title ? <Title>{title}</Title> : null}
                    <Legend
                        categories={data.map((data) => `${data.name}`)}
                        colors={colors}
                        className="mt-6 justify-center"
                    />
                    <DonutChart
                        variant="pie"
                        className="mt-6"
                        data={data}
                        category={valueLabel}
                        index={nameLabel}
                        colors={colors}
                    />
                </Flex>
            ) : (
                <Text>Loading...</Text>
            )}
            {children}
        </>
    );
}
