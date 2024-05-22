import { Card } from 'flowbite-react'
import '../App.css'

const AppCard = () => {
	return (
		<Card className="w-full max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
			<img
				src="./public/front-background.png"
				alt="Chatbot Illustration"
				className="w-full h-80 object-cover"
			/>
			<div className="p-6">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-800 mb-4">
					Projet d'API de Conversations entre Utilisateurs et Chatbot
				</h1>
				<p className="text-gray-700 dark:text-gray-400 mb-4">
					<strong>Description :</strong> Ce projet consiste en la création d'une
					API RESTful avec Symfony 7 pour gérer les conversations entre
					utilisateurs et un chatbot. L'API permet de réaliser des opérations
					CRUD (Create, Read, Update, Delete) sur les conversations et les
					messages échangés.
				</p>
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
					Technologies :
				</h2>
				<p className="text-gray-700 dark:text-gray-400">
					<strong>Backend :</strong> Symfony 7
				</p>
				<p className="text-gray-700 dark:text-gray-400">
					<strong>Base de Données :</strong> MySQL/PostgreSQL
				</p>
				<p className="text-gray-700 dark:text-gray-400">
					<strong>API :</strong> Implémentée avec API Platform, une extension de
					Symfony.
				</p>
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">
					Documentation de l'API :
				</h2>
				<p className="text-gray-700 dark:text-gray-400">
					L'API est documentée et accessible via une interface Swagger,
					permettant aux développeurs de tester et d'explorer les différentes
					routes et opérations disponibles.
				</p>
			</div>
		</Card>
	)
}

export default AppCard
