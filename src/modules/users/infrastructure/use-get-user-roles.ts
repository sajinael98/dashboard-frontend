import { useCustom } from "@refinedev/core";

interface UseGetUserRolesProps {
    userId: number;
    enabled?: boolean
}

export function useGetUserRoles({ userId, enabled = true }: UseGetUserRolesProps) {
    return useCustom({
        method: 'get',
        url: `/users/${userId}/roles`,
        queryOptions: {
            enabled
        }
    })
}