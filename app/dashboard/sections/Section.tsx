import React from "react";

export default function Section({
    SectionName,
    colClassNames,
    children,
}: {
    SectionName: string;
    colClassNames: string;
    children: React.ReactNode;
}) {
    return (
        <>
            <h2 className="text-2xl font-medium mt-6 ">{SectionName}</h2>
            <div className={`grid mt-1 gap-6 ${colClassNames} `}>
                {children}
            </div>
        </>
    );
}
