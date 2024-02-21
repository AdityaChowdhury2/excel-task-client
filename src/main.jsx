import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { Toaster } from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';
import SocketProvider from './providers/SocketProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<SocketProvider>
				<RouterProvider router={router} />
				<Toaster position="top-center" />
			</SocketProvider>
		</Provider>
	</React.StrictMode>
);
