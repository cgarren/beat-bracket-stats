import React, { createContext } from "react";

export const RocksetContext = createContext(undefined);

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
