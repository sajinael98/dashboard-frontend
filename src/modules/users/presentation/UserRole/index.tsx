import { useFormContext } from '@hooks/use-form';
import { Checkbox, SimpleGrid } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { useGetUserRoles } from '@modules/users/infrastructure';
import { UserRole } from '@modules/users/types';
import { useList } from '@refinedev/core';
import React, { useEffect } from 'react'

interface UserRolesProps {
  userId: number;
}

interface CheckboxProps {
  label: string;
  value: number;
  checked: boolean;
}

const UserRoles = ({ userId }: UserRolesProps) => {
  const [values, handlers] = useListState<CheckboxProps>([])
  const { data: roles, isSuccess } = useList({
    resource: "roles",
    pagination: {
      pageSize: 50
    },
  })
  const { data: userRoles, isSuccess: isUserRolesSuccess } = useGetUserRoles({ userId, enabled: isSuccess })
  const formCtx = useFormContext()

  useEffect(() => {
    if (isSuccess) {
      const items = roles?.data.map(role => ({ label: role.role, value: role.id, checked: false }))
      handlers.setState(items as CheckboxProps[]);
    }
  }, [isSuccess, roles?.data])

  useEffect(() => {
    if (isUserRolesSuccess) {
      const checkedRoles: { [key: string]: boolean } = {};
      userRoles.data.forEach((role: UserRole) => {
        checkedRoles[role.id] = true
      })
      formCtx.setValues(checkedRoles)
    }
  }, [isUserRolesSuccess])

  const items = values.map((value) => {
    const fld = formCtx.getInputProps(value.value.toString())
    return <Checkbox
      mt="xs"
      ml={33}
      label={value.label}
      key={value.value}
      {...fld}
      value={value.value}
      checked={fld.value}
    />
  });

  return (
    <SimpleGrid
      breakpoints={[
        {
          minWidth: 'lg',
          cols: 4
        },
        {
          minWidth: 'md',
          cols: 3
        },
        {
          minWidth: 'xs',
          cols: 1
        }
      ]}
    >
      {items}
    </SimpleGrid>
  )
}

export default UserRoles