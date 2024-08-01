import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { UseFormReturn } from "react-hook-form"
import { FormFieldAttributes } from "../schema/form"

export type FieldProps = {
    fieldKey?: string
    formReturn: UseFormReturn
    field: FormFieldAttributes
}

export function TextField({fieldKey, formReturn, field} : FieldProps) {
    return (
        <FormField
            key={fieldKey}
            control={formReturn.control}
            name={field.name!}
            render={(props) => (
                <FormItem>
                    <FormLabel>{field["aria-label"] || field.label}</FormLabel>
                    <FormControl>
                        <Input placeholder={field["aria-placeholder"]} {...props.field} />
                    </FormControl>
                    <FormDescription>
                        {field["aria-description"]}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}