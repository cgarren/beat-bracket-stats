import React, { useMemo } from "react";

import KPICard from "@/app/components/KPICard";
import Section from "./Section";

export default function UserSection({
    users,
    bracketsIn24h,
    bracketsIn72h,
}: {
    users: any;
    bracketsIn24h: any;
    bracketsIn72h: any;
}) {
    const usersIn24h = useMemo(() => {
        if (!bracketsIn24h) {
            return;
        }
        const users: string[] = [];
        for (const bracket of bracketsIn24h) {
            if (
                bracket.ownerUsername &&
                !users.includes(bracket.ownerUsername)
            ) {
                users.push(bracket.ownerUsername);
            }
        }
        return users;
    }, [bracketsIn24h]);

    const usersIn72h = useMemo(() => {
        if (!bracketsIn72h) {
            return;
        }
        const users: string[] = [];
        for (const bracket of bracketsIn72h) {
            if (
                bracket.ownerUsername &&
                !users.includes(bracket.ownerUsername)
            ) {
                users.push(bracket.ownerUsername);
            }
        }
        return users;
    }, [bracketsIn72h]);

    const userCount = users?.length;

    return (
        <Section SectionName="Users" colClassNames="sm:grid-cols-3">
            <KPICard title="Users" metric={userCount} target={1000} />
            <KPICard
                title="Users in 24h"
                metric={usersIn24h ? usersIn24h.length : usersIn24h}
                accordionTitle="User List"
                accordionData={usersIn24h}
            />
            <KPICard
                title="Users in 72h"
                metric={usersIn72h ? usersIn72h.length : usersIn72h}
                accordionTitle="User List"
                accordionData={usersIn72h}
            />
        </Section>
    );
}
