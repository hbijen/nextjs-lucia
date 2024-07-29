import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { FieldProps } from "./props"

export default function InputField({formReturn, field} : FieldProps) {
    return (
        <FormField
            control={formReturn.control}
            name={field.name}
            render={(props) => (
                <FormItem>
                    <FormLabel>{field.label}</FormLabel>
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