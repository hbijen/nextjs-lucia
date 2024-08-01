"use client";

import { Button } from "@/components/ui/button";
import {
	Form
} from "@/components/ui/form";
import { UseFormReturn, useForm } from "react-hook-form";


import { TextField } from '@/components/forms/fields/text-field';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { ZodTypeAny } from "zod";
import { isFormField } from "../fields/utils";
import { FieldOption, FormField, FormFieldAttributes, FormOption, FormTemplate } from "../schema/form";


export type DynamicFormProps<T> = {
	formSchema: ZodTypeAny
	formDescriptor: FormOption<T>
	defaultValues?: any
	action?: (formData: FormData) => void
	onSubmit?: (values: any) => void	
	children?: React.ReactNode
}

export function BasicForm<T,>({ formSchema, formDescriptor, defaultValues, children, onSubmit }: DynamicFormProps<T>) {
	const [formValues, setFormValues] = useState<{ [index: string]: any }>({})
	const [errors, setErrors] = useState<{ [index: string]: any }>({})

	const formReturn = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues,
	})	

	const { template, ...fields } = formDescriptor
	FormTemplate.parse(template)
	//Object.values().map(key => )
	//const formFields = generateFormFields(formDescriptor)
	console.log('formFields...', fields)

	return (
		<Card className="mx-auto max-w-2xl">
			<CardHeader>
				<CardTitle className="text-xl">{'Register'}</CardTitle>
			</CardHeader>
			<CardContent >
				<Form {...formReturn}>
					{ renderFields(formReturn, fields) }
					<div className="text-center p-4 col-span-2">
						{ children ?? <Button type='submit'>Submit</Button> }
					</div>
				</Form>
			</CardContent>
		</Card>
	)

}

const renderFields = (
	formReturn: UseFormReturn<any>,
	entries: FieldOption<any>,
	level = 1,
	parentKey = ''
) => {
	return entries.map(([key, formField], index) => {

		// if (isFormField(formField)) {
		// 	return renderField(formReturn, formField as FormFieldAttributes, `${parentKey}_${index}`)
		// }

		// if ()

		// if (ztf.isNestedObjectFieldOptions(field)) {
		// 	return Object.keys(field).map(key => {
		// 		const potentialArray = field[key].fields
		// 		const newKey = parentKey ? `${parentKey}.${key}` : key

		// 		if (isArray(potentialArray)) {
		// 			return (
		// 				<div
		// 					className={`form-nested level-${level}`}
		// 					key={`${key}_${index}`}
		// 				>
		// 					{renderFields(formReturn, potentialArray, level + 1, newKey)}
		// 				</div>
		// 			)
		// 		}

		// 		return null
		// 	})
		// }
		// console.log('parentKey: ' , parentKey, field.name)
		// if (field.tag === 'input' || field.tag === 'select') {
			
		// }
	})
}

const renderField = (formReturn: UseFormReturn, field: FormFieldAttributes, key: string) => {
	const fieldKey = key ? `${key}.${field.name}` : field.name
	//const error = get(errors, fieldKey)

	return (	
		<>
			<TextField key={fieldKey} fieldKey={fieldKey} formReturn={formReturn} field={field}></TextField>
		</>
	)
	//   <div className='form-field' key={field.name}>
	//     <label className='form-label' htmlFor={field.id}>
	//       {field.label}
	//     </label>
	//       <input
	//         type={field.type}
	//         name={field.name}
	//         id={field.id}
	//         className={
	//           field.type !== 'checkbox' ? 'form-input' : 'form-checkbox'
	//         }
	//         onChange={e => handleInputChange(e, fieldKey)}
	//         value={get(formValues, fieldKey) || ''}
	//       />
	//     <div className='errorContainer'>
	//       {error && <p className='form-error'>{error}</p>}
	//     </div>
	//   </div>
	// )
}