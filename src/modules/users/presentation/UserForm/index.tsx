import FormGrid from '@components/FormGrid'
import FormSection from '@components/FormSection'
import { FormProvider, useFormContext } from '@hooks/use-form'
import { SimpleGrid, TextInput } from '@mantine/core'
import React from 'react'

const UserForm = () => {
    const { getInputProps } = useFormContext()
    return (
        <>
            <FormSection title='Personal Information'>
                <FormGrid>
                    <TextInput
                        label='First Name'
                        {...getInputProps("firstName")}
                    />
                    <TextInput
                        label='Last Name'
                        {...getInputProps("lastName")}
                    />
                </FormGrid>
            </FormSection>
            <FormSection title='Account Information'>
                <FormGrid>
                    <TextInput
                        label='Username'
                        {...getInputProps("username")}
                    />
                    <TextInput
                        label='Email'
                        {...getInputProps("email")}
                    />
                </FormGrid>
            </FormSection>
        </>
    )
}

export default UserForm