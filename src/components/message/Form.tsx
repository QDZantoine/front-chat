import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Field from '../Field'
import { formatDateToISO } from '../../utils/formatDate'
import TResource from './type'
import { SubmissionError, TError } from '../../utils/types'

interface FormProps {
	onSubmit: (item: Partial<TResource>) => any
	initialValues?: Partial<TResource>
	error?: TError
	reset: () => void
}

const Form = ({ onSubmit, error, reset, initialValues }: FormProps) => {
	const {
		register,
		setError,
		handleSubmit,
		formState: { errors },
	} = useForm<TResource>({
		defaultValues: initialValues
			? {
					...initialValues,
					createdAt: initialValues.createdAt
						? formatDateToISO(initialValues.createdAt)
						: '', // Formater la date
			  }
			: undefined,
	})

	useEffect(() => {
		if (error instanceof SubmissionError) {
			Object.keys(error.errors).forEach((errorPath) => {
				if (errors[errorPath as keyof TResource]) {
					return
				}
				setError(errorPath as keyof TResource, {
					type: 'server',
					message: error.errors[errorPath],
				})
			})

			reset()
		}
	}, [error, errors, reset, setError])

	const onFormSubmit: SubmitHandler<TResource> = (data) => {
		onSubmit({
			...data,
		})
	}

	return (
		<form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
			<Field
				register={register}
				name="created At"
				placeholder=""
				type="datetime-local" // Utiliser "datetime-local" pour le bon type HTML5
				errors={errors}
			/>
			<Field
				register={register}
				name="text"
				placeholder=""
				type="text"
				errors={errors}
			/>
			<Field
				register={register}
				name="conversation"
				placeholder=""
				type="text"
				errors={errors}
			/>
			<Field
				register={register}
				name="user Kind"
				placeholder=""
				type="number"
				errors={errors}
			/>

			<button
				type="submit"
				className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
			>
				Submit
			</button>
		</form>
	)
}

export default Form
