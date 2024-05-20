import { Link, Navigate, useParams } from 'react-router-dom'
import Links from '../Links'
import { useRetrieve, useDelete } from '../../hooks'
import TResource from './type'
import { TError } from '../../utils/types'
import { Button, Spinner } from 'flowbite-react'
import { format } from 'date-fns'

interface ShowProps {
	retrieved: TResource | null
	loading: boolean
	error: TError
	deleteError: TError
	deleted: TResource | null
	del: (item: TResource) => any
}
const userKind = {
	'1': 'user',
	'2': 'bot',
}
const extractConversationId = (url: string) => {
	const parts = url.split('/')
	return parts[parts.length - 1]
}
const extractMessageId = (id: string) => {
	const parts = id.split('/')
	return parts[parts.length - 1]
}

const ShowView = ({
	del,
	deleteError,
	deleted,
	error,
	loading,
	retrieved: item,
}: ShowProps) => {
	if (deleted) {
		return <Navigate to="/messages/" replace />
	}

	const delWithConfirm = () => {
		if (item && window.confirm('Are you sure you want to delete this item?')) {
			del(item)
		}
	}
	const MessageId = item ? extractMessageId(item['@id']) : ''
	return (
		<div>
			<h1 className="text-2xl font-extrabold dark:text-gray mb-4">
				Message {MessageId}
			</h1>

			{loading && (
				<div className="flex justify-center mb-2">
					{' '}
					<Button color="gray">
						<Spinner aria-label="Alternate spinner button example" size="md" />
						<span className="pl-3">Loading...</span>
					</Button>
				</div>
			)}
			{error && (
				<div className="alert alert-danger" role="alert">
					<span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
					{error.message}
				</div>
			)}
			{deleteError && (
				<div className="alert alert-danger" role="alert">
					<span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
					{deleteError.message}
				</div>
			)}

			{item && (
				<div className=" relative overflow-x-auto shadow-md sm:rounded-lg my-4">
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
								<th scope="row" className="px-6 py-3">
									Field
								</th>
								<th scope="row" className="px-6 py-3">
									Value
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
								<th scope="row" className="px-6 py-3">
									createdAt
								</th>
								<td>
									{format(new Date(item['createdAt']), 'yyyy/MM/dd HH:mm')}
								</td>
							</tr>
							<tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
								<th scope="row" className="px-6 py-3">
									text
								</th>
								<td>{item['text']}</td>
							</tr>
							<tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
								<th scope="row" className="px-6 py-3">
									conversation
								</th>
								<td>
									<Links
										items={{
											href: `/conversations/show/${encodeURIComponent(
												item['conversation']
											)}`,
											name: `Conversation ${extractConversationId(
												item['conversation']
											)}`,
										}}
									/>
								</td>
							</tr>
							<tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
								<th scope="row" className="px-6 py-3">
									userKind
								</th>
								<td>{userKind[item['userKind']] || item['userKind']}</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
			<Link
				to="/messages/"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Back to list
			</Link>
			{item && (
				<Link to={`/messages/edit/${encodeURIComponent(item['@id'])}`}>
					<button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
						Edit
					</button>
				</Link>
			)}
			<button
				onClick={delWithConfirm}
				className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
			>
				Delete
			</button>
		</div>
	)
}

const Show = () => {
	const { id } = useParams<{ id: string }>()
	const { retrieved, loading, error } = useRetrieve<TResource>(
		decodeURIComponent(id || '')
	)
	const { deleted, error: deleteError, del } = useDelete<TResource>()

	return (
		<ShowView
			retrieved={retrieved}
			loading={loading}
			error={error}
			deleteError={deleteError}
			deleted={deleted}
			del={del}
		/>
	)
}

export default Show
