import { Link } from 'react-router-dom'

interface LinksProps {
	items:
		| string
		| string[]
		| { href: string; name: string; className?: string }
		| { href: string; name: string; className?: string }[]
}

const Links = ({ items }: LinksProps) => {
	if (Array.isArray(items)) {
		return (
			<>
				{items.map((item, index) => (
					<div key={index}>
						<Links items={item} />
					</div>
				))}
			</>
		)
	}
	if (typeof items === 'string') {
		return <Link to={items}>{items}</Link>
	}

	return (
		<Link to={items.href} className={items.className}>
			{items.name}
		</Link>
	)
}

export default Links
