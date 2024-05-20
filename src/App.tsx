import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import conversationRoutes from './routes/conversation'
import messageRoutes from './routes/message';
import userRoutes from './routes/user';
import './App.css';

function App() {
	return (
		<Router>
			<AppNavbar />
			<Routes>
				{conversationRoutes}
				{messageRoutes}
				{userRoutes}
				<Route path="*" element={<Navigate replace to="/" />} />
			</Routes>
		</Router>
	);
}

export default App;
