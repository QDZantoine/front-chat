import {
	DeepMap,
	FieldError,
	FieldValues,
	Path,
	UseFormRegister,
} from 'react-hook-form'

interface FieldProps<TFieldValues extends FieldValues> {
	register: UseFormRegister<TFieldValues>
	name: Path<TFieldValues>
	placeholder: string
	type: string
	step?: string
	required?: boolean
	errors: Partial<DeepMap<TFieldValues, FieldError>>
}

const Field = <TFieldValues extends FieldValues>({
	register,
	name,
	placeholder,
	type,
	step,
	required = false,
	errors,
}: FieldProps<TFieldValues>) => {
	const inputProps: { className: string; 'aria-invalid'?: boolean } = {
		className:
			'form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
	}

	if (errors[name]) {
		inputProps.className += ' border-red-500'
		inputProps['aria-invalid'] = true
	}

	if (!errors[name]) {
		inputProps.className += ' border-green-500'
	}

	return (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-700" htmlFor={name}>
				{name}
			</label>
			<input
				id={name}
				placeholder={placeholder}
				type={type}
				step={step}
				className={inputProps.className}
				aria-invalid={inputProps['aria-invalid']}
				{...register(name, {
					required: 'Required',
					valueAsNumber: type === 'number',
				})}
			/>
			{errors[name] && (
				<p className="mt-2 text-sm text-red-600">{errors[name]?.message}</p>
			)}
		</div>
	)
}

export default Field
