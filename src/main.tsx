import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
// Import your routes here
import conversationRoutes from './routes/conversation'
import messageRoutes from './routes/message';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>}/>
        { conversationRoutes }
        { messageRoutes }
        <Route path='*' element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  </React.StrictMode>
);