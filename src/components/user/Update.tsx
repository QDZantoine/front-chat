import { Link, Navigate, useParams } from 'react-router-dom'
import Form from './Form'
import { useDelete, useRetrieve, useUpdate } from '../../hooks'
import TResource from './type'
import { TError } from '../../utils/types'

interface UpdateProps {
	retrieved: TResource | null
	retrieveLoading: boolean
	retrieveError: TError
	updateLoading: boolean
	updateError: TError
	deleteLoading: boolean
	deleteError: TError
	created: TResource | null
	updated: TResource | null
	deleted: TResource | null
	del: (item: TResource) => any
	update: (item: TResource, values: Partial<TResource>) => any
	reset: () => void
}

const extractUserId = (id: string) => {
	const parts = id.split('/')
	return parts[parts.length - 1]
}

const UpdateView = ({
	created,
	del,
	deleteError,
	deleteLoading,
	deleted,
	retrieveError,
	retrieveLoading,
	retrieved,
	update,
	updateError,
	updateLoading,
	updated,
	reset,
}: UpdateProps) => {
	if (deleted) {
		return <Navigate to="/users/" replace />
	}

	const item = updated ? updated : retrieved
	const delWithConfirm = () => {
		if (
			retrieved &&
			window.confirm('Are you sure you want to delete this item?')
		) {
			del(retrieved)
		}
	}

	const UserId = item ? extractUserId(item['@id']) : ''

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-extrabold text-gray-900 mb-4">
				Edit User {UserId}
			</h1>

			{created && (
				<div
					className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
					role="alert"
				>
					{created['@id']} created.
				</div>
			)}
			{updated && (
				<div
					className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
					role="alert"
				>
					{updated['@id']} updated.
				</div>
			)}
			{(retrieveLoading || updateLoading || deleteLoading) && (
				<div
					className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4"
					role="alert"
				>
					Loading...
				</div>
			)}
			{retrieveError && (
				<div
					className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
					role="alert"
				>
					<span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
					{retrieveError.message}
				</div>
			)}
			{updateError && (
				<div
					className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
					role="alert"
				>
					<span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
					{updateError.message}
				</div>
			)}
			{deleteError && (
				<div
					className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
					role="alert"
				>
					<span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
					{deleteError.message}
				</div>
			)}

			{item && (
				<Form
					onSubmit={(values) => {
						reset()
						update(item, values)
					}}
					error={updateError}
					reset={reset}
					initialValues={item}
				/>
			)}
			<div className="mt-4">
				<Link
					to="/users/"
					className="inline-block text-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Back to list
				</Link>
				<button
					onClick={delWithConfirm}
					className="inline-block text-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
				>
					Delete
				</button>
			</div>
		</div>
	)
}

const Update = () => {
	const { id } = useParams<{ id: string }>()
	const {
		retrieved,
		loading: retrieveLoading,
		error: retrieveError,
	} = useRetrieve<TResource>(decodeURIComponent(id || ''))
	const {
		updated,
		update,
		reset,
		loading: updateLoading,
		error: updateError,
	} = useUpdate<TResource>()
	const {
		deleted,
		loading: deleteLoading,
		error: deleteError,
		del,
	} = useDelete<TResource>()

	return (
		<UpdateView
			retrieved={retrieved}
			retrieveLoading={retrieveLoading}
			retrieveError={retrieveError}
			updateLoading={updateLoading}
			updateError={updateError}
			deleteLoading={deleteLoading}
			deleteError={deleteError}
			created={null}
			updated={updated}
			deleted={deleted}
			del={del}
			update={update}
			reset={reset}
		/>
	)
}

export default Update
