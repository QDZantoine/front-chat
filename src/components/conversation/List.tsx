import { Link, useParams } from 'react-router-dom'
import Links from '../Links'
import Pagination from '../Pagination'
import { useRetrieve } from '../../hooks'
import { PagedCollection } from '../../interfaces/Collection'
import TResource from './type'
import { TError } from '../../utils/types'
import { Button, Spinner } from 'flowbite-react'
import { format } from 'date-fns'

interface ListProps {
	retrieved: PagedCollection<TResource> | null
	loading: boolean
	error: TError
}
const userMap = {
	'/api/users/1': 'Antoine',
	'/api/users/2': 'Didier',
	'/api/users/3': 'Jouni',
	'/api/users/4': 'Bot1',
}
const extractConversationId = (id: string) => {
	const parts = id.split('/')
	return `conversation ${parts[parts.length - 1]}`
}
const ListView = ({ error, loading, retrieved }: ListProps) => {
	const items = (retrieved && retrieved['hydra:member']) || []

	return (
		<div>
			<h1 className="text-5xl font-extrabold dark:text-gray mb-4">
				Conversation List
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
			{error && <div className="alert alert-danger">{error.message}</div>}

			<p>
				<Link
					to="create"
					className=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Create
				</Link>
			</p>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
				<table className="mt-4 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								id
							</th>
							<th scope="col" className="px-6 py-3">
								created At
							</th>
							<th scope="col" className="px-6 py-3">
								nb Messages
							</th>
							<th scope="col" className="px-6 py-3">
								user
							</th>
							<th scope="col" className="px-6 py-3">
								bot
							</th>
							<th colSpan={2} />
						</tr>
					</thead>
					<tbody>
						{items.map((item) => (
							<tr
								key={item['@id']}
								className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
							>
								<th
									scope="row"
									className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									<Links
										items={{
											href: `show/${encodeURIComponent(item['@id'])}`,
											name: extractConversationId(item['@id']),
										}}
									/>
								</th>
								<td className="px-6 py-4">
									{format(new Date(item['createdAt']), 'yyyy/MM/dd HH:mm')}
								</td>
								<td className="px-6 py-4">{item['nbMessages']}</td>
								<td className="px-6 py-4">
									<Links
										items={{
											href: `/users/show/${encodeURIComponent(item['user'])}`,
											name: userMap[item['user']] || item['user'],
										}}
									/>
								</td>
								<td className="px-6 py-4">
									<Links
										items={{
											href: `/users/show/${encodeURIComponent(item['bot'])}`,
											name: userMap[item['bot']] || item['bot'],
										}}
									/>
								</td>
								<td className="px-6 py-4">
									<Link
										to={`/conversations/show/${encodeURIComponent(
											item['@id']
										)}`}
									>
										<span className="fa fa-search" aria-hidden="true" />
										<span className="sr-only">Show</span>
									</Link>
								</td>
								<td className="px-6 py-4">
									<Link
										to={`/conversations/edit/${encodeURIComponent(
											item['@id']
										)}`}
									>
										<span className="fa fa-pencil" aria-hidden="true" />
										<span className="sr-only">Edit</span>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Pagination retrieved={retrieved} />
		</div>
	)
}

const List = () => {
	const { page } = useParams<{ page?: string }>()
	const id = (page && decodeURIComponent(page)) || 'api/conversations'

	const { retrieved, loading, error } =
		useRetrieve<PagedCollection<TResource>>(id)

	return <ListView retrieved={retrieved} loading={loading} error={error} />
}

export default List
