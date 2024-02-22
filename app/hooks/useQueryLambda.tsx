import { useCallback } from "react";

import { baseUrl } from "../lib/utils";

export default function useQueryLambda() {
    const executeQuery = useCallback(
        async (
            queryLambdaName: string,
            parameters: { name: string; type: string; value: string }[]
        ) => {
            const res = await fetch(
                `${baseUrl}/executeQuery?queryLambdaName=${queryLambdaName}`,
                {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({ parameters: parameters }),
                }
            );
            if (!res.ok) {
                throw new Error(await res.text(), {
                    cause: res.status,
                });
            }
            return res.json();
        },
        []
    );

    return { executeQuery };
}
