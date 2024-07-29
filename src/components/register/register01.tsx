"use client"

import { z } from 'zod'
import { ztf } from 'zod-to-fields'
import { DynamicForm } from '../forms/dynamic-form'

function Register01() {

    const formSchema = z.object({
        firstname: z.string({ required_error: 'Name is required' })
            .min(1, { message: 'name can not be empty.' }),
        lastName: z.string().min(1, { message: 'lastName can not be empty.' }),
        email: z.string(),
    })

    const options = ztf
        .createOptions(formSchema)
        .withFieldOptions({
            firstname: {
                label: 'First Name',
                type: 'text',
            },
            lastName: {
                label: 'Last Name',
                type: 'text',
            },
            email: {
                type: 'email',
            }
        })
        .build()

    const formFields = ztf.generateFields(formSchema, options)

    // const handleSubmit = (e: { preventDefault: () => void }) => {
    //     e.preventDefault()

    //     const result = FormSchema.safeParse(formValues)
    //     if (result.success) {
    //         setErrors({})
    //     } else {
    //         setErrors(result.error.formErrors.fieldErrors)
    //     }
    // }

    return (
        <DynamicForm formSchema={formSchema} formFields={formFields}>
        </DynamicForm>
    )
}

export default Register01