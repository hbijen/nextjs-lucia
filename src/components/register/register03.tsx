"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { ReactNode } from "react";
import * as z from "zod";

// Define your form schema using zod
const formSchema = z.object({
    application: z.object({
        applicationNo: z.string(),
        passport: z.string(),
        dateOfApplication: z.date().default(new Date()),
    }),
    firstname: z.string(),
    lastname: z.string(),
    graduation: z.string(),
    migration: z.string(),
})

type FormDataType = z.infer<typeof formSchema>

export default function Register03() {

    const initializedSchema = formSchema.extend({
        application: z.object({
            applicationNo: z.string().default("A001"),
            passport: z.string(),
            dateOfApplication: z.date().default(new Date()),
        })
    })

    const handleSubmit = (e: FormDataType) => {
        console.log('submit data ', e)
    }

    return (
        <>
            <AutoForm
                onSubmit={handleSubmit}
                // Pass the schema to the form
                formSchema={initializedSchema}
                // You can add additional config for each field
                // to customize the UI
                fieldConfig={{
                    application: {
                        renderParent: Fix2Grid,
                        passport: {
                            fieldType: 'passport',
                            renderParent: (props: any) => {
                                return (
                                    <div className="row-span-2 justify-self-end">
                                        {props.children}
                                    </div>
                                )
                            }
                        },
                        applicationNo: {
                            inputProps: {
                                readOnly: true
                            }
                        }
                    },
                    graduation: {
                        fieldType: 'file'
                    },
                    migration: {
                        fieldType: 'file'
                    },
                }}
                // Optionally, define dependencies between fields
                dependencies={[
                ]}
            >
                <div className="text-center">
                    <AutoFormSubmit>Register</AutoFormSubmit>
                </div>

            </AutoForm>
        </>
    );
}

function Fix2Grid({ children }: { children: ReactNode }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {children}
        </div>
    )
}