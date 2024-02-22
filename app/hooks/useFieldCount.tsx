import { useCallback } from "react";
import useQueryLambda from "./useQueryLambda";

export interface fieldCountType {
    [key: string]: number;
}

export default function useFieldCount() {
    const { executeQuery } = useQueryLambda();

    const getFieldCount = useCallback(
        async (field: string) => {
            const res: any = await executeQuery("FieldCount", [
                {
                    name: "fieldToCount",
                    type: "string",
                    value: field,
                },
            ]);
            return res;
        },
        [executeQuery]
    );

    const processFieldCount = (data: any) => {
        const newData: fieldCountType = {};
        let total = 0;
        for (const element of data) {
            newData[element.fieldValue] = element.num;
            total += element.num;
        }
        newData.total = total;
        return newData;
    };

    return { getFieldCount, processFieldCount };
}
