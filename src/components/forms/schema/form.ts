import { z } from "zod"
import { InputHTMLAttributes, OptionHTMLAttributes, SelectHTMLAttributes } from "react"

export const FormFieldType = 
z.enum([
'checkbox'
, 'date'
, 'email'
, 'file'
, 'hidden'
, 'image'
, 'number'
, 'password'
, 'radio'
, 'range'
, 'search'
, 'select'
, 'tel'
, 'text'
])
export type FormFieldType = z.infer<typeof FormFieldType>

export type InputAttributes = InputHTMLAttributes<HTMLInputElement>;
export type SelectAttributes = SelectHTMLAttributes<HTMLSelectElement>;
export type OptionAttributes = OptionHTMLAttributes<HTMLOptionElement>;

export type NestedFormFieldAttributes<T> = {
    [K in keyof T]: T[K] extends object
    ? FieldOption<T[K] & FieldStyle>
    : FormFieldAttributes & FieldStyle
}
export type FieldOption<T> = Partial<NestedFormFieldAttributes<T>>;


// add any custom attributes to work with the ui schema here
// these will be added to both the input elements and the layout parent elements of the input elements
type _FieldStyle = {
    label: string
    classNames: string
}
export type FieldStyle = Partial<{_ : Partial<_FieldStyle>}>

export type FormFieldAttributes = InputAttributes & SelectAttributes & OptionAttributes & {
    fieldType?: FormFieldType
}

// export type NestedFormFieldAttributes = {
//     [key: string]: {
//         fields: FormFieldAttributes;
//         description?: string;
//     };
// };
//export type FormField = FormFieldAttributes | FormFieldAttributes[];
// export type FormFieldArray = Array<FormField>

export const FormTemplate = z.object({
    version: z.string().min(1),
    name: z.string().min(1)
})
export type FormTemplate = z.infer<typeof FormTemplate>

export type FormOption<T> = FieldOption<T> & {template: FormTemplate}

export const REGISTER101: FormTemplate = {
    name: "Register01",
    version: "0.1"
}