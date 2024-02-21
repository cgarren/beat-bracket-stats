import { useCallback, useContext } from "react";
import { RocksetContext } from "../context/rocksetContext";

export default function useQueryLambda() {
    const rocksetClient = useContext(RocksetContext);

    const executeQuery = useCallback(
        async (
            queryLambdaName: string,
            parameters: { name: string; type: string; value: string }[]
        ) => {
            if (rocksetClient) {
                const { results } =
                    await rocksetClient.queryLambdas.executeQueryLambdaByTag(
                        "commons",
                        queryLambdaName,
                        "latest",
                        {
                            parameters: parameters,
                        }
                    );
                return results;
            }
            return [];
        },
        [rocksetClient]
    );

    return { executeQuery };
}
