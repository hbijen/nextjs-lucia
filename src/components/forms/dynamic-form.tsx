"use client";

import {
	Form
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn, useForm } from "react-hook-form";


import InputField from '@/components/forms/fields/input-field';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from "react";
import { ztf } from 'zod-to-fields';
import { zodResolver } from "@hookform/resolvers/zod";


export type DynamicFormProps = {
	formSchema: any
	formFields: any
	defaultValues?: any
	action?: (formData: FormData) => void
	onSubmit?: (values: any) => void
	children?: React.ReactNode
}

export function DynamicForm({ formSchema, formFields, defaultValues, children, onSubmit }: DynamicFormProps) {
	const [formValues, setFormValues] = useState<{ [index: string]: any }>({})
	const [errors, setErrors] = useState<{ [index: string]: any }>({})

	const formReturn = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues,
	})

	return (
		<Card className="mx-auto max-w-2xl">
			<CardHeader>
				<CardTitle className="text-xl">{'Register'}</CardTitle>
			</CardHeader>
			<CardContent >
				<Form {...formReturn}>
					{renderFields(formReturn, formFields)}

					<div className="text-center p-4 col-span-2">
						{ children ?? <Button type='submit'>Submit</Button> }
					</div>
				</Form>
			</CardContent>
		</Card>
	)

}

const renderField = (formReturn: UseFormReturn, field: ztf.GenericSingleFieldOptions, key = '') => {
	const fieldKey = key ? `${key}.${field.name}` : field.name
	//const error = get(errors, fieldKey)
	const isSelect = field.tag === 'select'

	return (
		<InputField formReturn={formReturn} field={field}></InputField>
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

const renderFields = (
	formReturn: UseFormReturn<any>,
	fields: ztf.FormFieldsArray,
	level = 1,
	parentKey = ''
) => {
	return fields.map((field, index) => {
		if (ztf.isNestedObjectFieldOptions(field)) {
			return Object.keys(field).map(key => {
				const potentialArray = field[key].fields
				const newKey = parentKey ? `${parentKey}.${key}` : key

				if (ztf.isFormFieldsArray(potentialArray)) {
					return (
						<div
							className={`form-nested level-${level}`}
							key={`${key}_${index}`}
						>
							<h3>{field[key].description || key.toUpperCase()}</h3>
							{renderFields(formReturn, potentialArray, level + 1, newKey)}
						</div>
					)
				}

				return null
			})
		}

		if (field.tag === 'input' || field.tag === 'select') {
			return renderField(formReturn, field, parentKey)
		}
	})
}
