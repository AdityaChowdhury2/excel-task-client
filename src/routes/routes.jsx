import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AddTask from '../pages/Manager/AddTask';
import CreateProject from '../pages/Admin/CreateProject';
// import PrivateRoute from './PrivateRoute';
// import AllTask from '../pages/AllTask';
import AllManager from '../pages/AllManager';
import AllProjects from '../pages/Admin/AllProjects';
import AdminRoute from './AdminRoute';
import MyProjects from '../pages/Manager/MyProjects';
import ManagerRoute from './ManagerRoute';
import MemberRoute from './MemberRoute';
import MyTasks from '../pages/Member/MyTasks';
import UpdateTask from '../pages/Member/UpdateTask';
import { getToken } from '../utils/localDb';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '/add-task',
				element: (
					<ManagerRoute>
						<AddTask />
					</ManagerRoute>
				),
			},
			{
				path: '/create-project',
				element: (
					<AdminRoute>
						<CreateProject />
					</AdminRoute>
				),
			},
			// {
			// 	path: '/all-tasks',
			// 	element: (
			// 		<PrivateRoute>
			// 			<AllTask />
			// 		</PrivateRoute>
			// 	),
			// },
			{
				path: '/managers',
				element: (
					<AdminRoute>
						<AllManager />
					</AdminRoute>
				),
			},
			{
				path: '/all-projects',
				element: (
					<AdminRoute>
						<AllProjects />
					</AdminRoute>
				),
			},
			{
				path: '/my-projects',
				element: (
					<ManagerRoute>
						<MyProjects />
					</ManagerRoute>
				),
			},
			{
				path: '/my-tasks',
				element: (
					<MemberRoute>
						<MyTasks />
					</MemberRoute>
				),
			},
			{
				path: '/my-tasks/:taskId',
				element: (
					<MemberRoute>
						<UpdateTask />
					</MemberRoute>
				),
				loader: async ({ params }) => {
					const response = await fetch(
						`${import.meta.env.VITE_SERVER_URL}/api/v1/tasks/${params.taskId}`,
						{
							headers: {
								authorization: getToken(),
							},
						}
					);
					const result = await response.json();
					return result;
				},
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
