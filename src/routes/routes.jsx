import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AddTask from '../pages/AddTask';
import CreateProject from '../pages/CreateProject';
import PrivateRoute from './PrivateRoute';
import AllTask from '../pages/AllTask';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '/add-task',
				element: (
					<PrivateRoute>
						<AddTask />
					</PrivateRoute>
				),
			},
			{
				path: '/create-project',
				element: (
					<PrivateRoute>
						<CreateProject />
					</PrivateRoute>
				),
			},
			{
				path: '/all-tasks',
				element: (
					<PrivateRoute>
						<AllTask />
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
]);
