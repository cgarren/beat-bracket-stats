import React, { createContext } from "react";

export const RocksetContext = createContext({
    queryLambdas: {
        executeQueryLambdaByTag: async (...params: any) => {
            const ret: { results: any[] } = { results: [] };
            return ret;
        },
    },
});

export function RocksetProvider({
    children,
    rocksetClient,
}: {
    children?: React.ReactNode;
    rocksetClient: any;
}) {
    return (
        <RocksetContext.Provider value={rocksetClient}>
            {children}
        </RocksetContext.Provider>
    );
}
