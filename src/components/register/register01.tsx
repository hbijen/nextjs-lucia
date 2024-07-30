"use client"

import ztf from 'zod-to-fields'
import { DynamicForm } from '../forms/dynamic-form'
import { Person } from '../forms/schema/person'

function Register01() {

    const formSchema = Person

    // const uiFields: DynamicFieldOption<Person> = {
    //     name: {
    //         firstname: {
    //             fieldType: 'input',
    //             "aria-label": "First Name",
    //         },
    //         lastname: {
    //             fieldType: 'input',
    //             "aria-label": "Last Name",
    //         }
    //     }
    // }
    const options = ztf.createOptions(Person).withFieldOptions({
        name: {
            firstname: {
                "aria-label": "First Name",
            },
            lastname: {
                "aria-label": "Last Name",
            }
        },
        contact: {
            phone: {
                "aria-label": "Phone",
            },
            email: {
                "aria-label": "Email",
            },
        }

    }).build()
    
    const formFields = ztf.generateFields(Person, options)

    return (
        <DynamicForm formSchema={formSchema} formFields={formFields}>
        </DynamicForm>
    )
}

export default Register01