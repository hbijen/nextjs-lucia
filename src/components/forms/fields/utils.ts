import { NestedFormFieldAttributes, FormFieldType, FieldOption } from "../schema/form";

export function isFormField(field: NestedFormFieldAttributes<any>) {
    const fieldType = FormFieldType.safeParse(field.fieldType)
    return fieldType.success
}

// export function generateFormFields<T>(descriptors: FormOption<T> ) {
//     const { template, ...fields } = descriptors
//     // throws an error if the template data is missing
//     FormTemplate.parse(template)

//     console.log('Object.entries(fields) ', Object.entries(fields))

//     return generateFields( Object.entries(fields) )
// }

export function generateFields(fieldOptions: FieldOption<any>)  {
    console.log('.....', fieldOptions)
    const result[] = []
    for(const entry of entries) {
        const [key, formField] = entry
        console.log('key ', key, ', value ', isFormField(formField))

        if (isFormField(formField)) {
            result.push(formField as FormFieldAttributes)
        } else {
            result.push( generateFields( Object.entries(formField) ) )
        }
    }
    return result
}