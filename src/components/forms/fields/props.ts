import { UseFormReturn } from "react-hook-form"
import ztf from "zod-to-fields"

export type FieldProps = {
    formReturn: UseFormReturn
    field: ztf.GenericSingleFieldOptions
}