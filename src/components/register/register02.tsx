"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { ReactNode } from "react";
import * as z from "zod";

// Define your form schema using zod
const formSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    fathersName: z.string().optional(),
    personalInfo: z.object({
        gender: z.enum(["M", "F"]),
        dob: z.date().optional(),
        aadhaar: z.string().optional(),
    }),
    contact: z.object({
        email: z.string().email(), // Validate email format
        phone: z.coerce.number(), // Validate email format
    }),
    address: z.object({
        line1: z.string(),
        line2: z.string().optional(),
        state: z.string(),
        pin: z.coerce.number()
    }),
    addressDetail: z.object({
        account_holder_name: z.string(),
        account_number: z.string(),
        ifsc: z.string(),
    })
})


type FormDataType = z.infer<typeof formSchema>

export default function Register02() {

    const handleSubmit = (e: FormDataType) => {
        console.log('submit data ', e)
    }

    return (
        <AutoForm

            onSubmit={handleSubmit}
            // Pass the schema to the form
            formSchema={formSchema}
            // You can add additional config for each field
            // to customize the UI
            fieldConfig={{
                contact: {
                    renderParent: Column2Grid
                },
                address: {
                    renderParent: Column2Grid
                },
                personalInfo: {
                    renderParent: Column12Grid,
                    dob: {
                        label: "Date of Birth",
                        className: 'col-span-12 md:col-span-5'
                    },
                    gender: {
                        fieldType: 'radio',
                        className: 'col-span-12 md:col-span-2'
                    },
                    aadhaar: {
                        className: 'col-span-12 md:col-span-5'
                    }
                }
            }}
            // Optionally, define dependencies between fields
            dependencies={[
            ]}
        >
            <div className="text-center">
                <AutoFormSubmit>Register</AutoFormSubmit>
            </div>

        </AutoForm>
    );
}

function Column2Grid({ children }: { children: ReactNode }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {children}
        </div>
    )
}

function Column12Grid({ children }: { children: ReactNode }) {
    return (
        <div className="grid grid-cols-12 gap-4">
            {children}
        </div>
    )
}