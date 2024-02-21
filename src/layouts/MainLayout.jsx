import { Link, NavLink, Outlet } from 'react-router-dom';
// import Navbar from '../components/Navbar';
import { RiMenu2Line } from 'react-icons/ri';
import { useGetCurrentUserQuery } from '../redux/api/apiService';
import { useDispatch, useSelector } from 'react-redux';

import { loggedInUser } from '../redux/features/auth/authSlice';
import { removeToken } from '../utils/localDb';
import { useEffect } from 'react';
import useSocket from '../hooks/useSocket';
import toast from 'react-hot-toast';
// import { useLocation } from 'react-router-dom';

const MainLayout = () => {
	const dispatch = useDispatch();
	const { data: currentUser, isLoading, refetch } = useGetCurrentUserQuery();
	// const location = useLocation();
	// console.log(location);

	useEffect(() => {
		if (!isLoading && currentUser?.user) {
			dispatch(loggedInUser(currentUser?.user));
		} else {
			// dispatch(loggedInUser(null));
		}
	}, [currentUser?.user, isLoading]);

	const socket = useSocket();

	useEffect(() => {
		if (socket === null) return;
		socket.on('updateTask', ([data]) => {
			if (user?.email === data.createdBy) {
				toast.success(`Task ${data.title} status updated`);
			}
		});
		return () => {
			socket.off('updateTask');
		};
	}, [socket]);

	const { user } = useSelector(state => state.auth);

	const navLinks = (
		<>
			{user?.role === 'manager' && (
				<>
					<li>
						<NavLink
							to={'/add-task'}
							className={({ isActive }) =>
								isActive
									? 'bg-slate-300 px-3 py-1 rounded-lg'
									: 'py-1 px-3 rounded-lg'
							}
						>
							Add Task
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/my-projects'}
							className={({ isActive }) =>
								isActive
									? 'bg-slate-300 px-3 py-1 rounded-lg'
									: 'py-1 px-3 rounded-lg'
							}
						>
							My Projects
						</NavLink>
					</li>
				</>
			)}
			{user?.role === 'member' && (
				<>
					<li>
						<NavLink
							to={'/my-tasks'}
							className={({ isActive }) =>
								isActive
									? 'bg-slate-300 px-3 py-1 rounded-lg'
									: 'py-1 px-3 rounded-lg'
							}
						>
							Tasks
						</NavLink>
					</li>
				</>
			)}

			{user?.role === 'admin' && (
				<>
					<li>
						<NavLink
							to={'/create-project'}
							className={({ isActive }) =>
								isActive
									? 'bg-slate-300 px-3 py-1 rounded-lg'
									: 'py-1 px-3 rounded-lg'
							}
						>
							Create project
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/managers'}
							className={({ isActive }) =>
								isActive
									? 'bg-slate-300 px-3 py-1 rounded-lg'
									: 'py-1 px-3 rounded-lg'
							}
						>
							Managers
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/all-projects'}
							className={({ isActive }) =>
								isActive
									? 'bg-slate-300 px-3 py-1 rounded-lg'
									: 'py-1 px-3 rounded-lg'
							}
						>
							Projects
						</NavLink>
					</li>
				</>
			)}
		</>
	);

	return (
		<>
			<div className="drawer ">
				<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content  flex flex-col">
					{/* Navbar */}
					<div className="w-full  navbar bg-base-300 ">
						<div className="container">
							<div className="flex-none  lg:hidden">
								<label
									htmlFor="my-drawer-3"
									aria-label="open sidebar"
									className="btn btn-square btn-ghost"
								>
									<RiMenu2Line />
								</label>
							</div>
							<div className=" px-2 uppercase mx-2 font-thin">
								<Link to={'/'}>
									<span className=" tracking-[1.2rem] font-extrabold">
										Task
									</span>{' '}
									<br /> Management
								</Link>
							</div>
							<ul className="hidden lg:flex flex-1 justify-center gap-4">
								{navLinks}
							</ul>
							<div className="flex-none hidden lg:block">
								{/* Navbar menu content here */}

								{
									// currentUser?.user?.email ||
									user?.email ? (
										<div className="dropdown dropdown-end">
											<div
												tabIndex={0}
												role="button"
												className="btn btn-ghost btn-circle avatar"
											>
												<div className="w-10 rounded-full">
													<img
														alt="Tailwind CSS Navbar component"
														src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
													/>
												</div>
											</div>
											<ul
												tabIndex={0}
												className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
											>
												<li>
													<a className="justify-between">{user?.name}</a>
												</li>
												<li>
													<a>{user?.role}</a>
												</li>
												<li
													onClick={() => {
														removeToken();
														refetch();
														dispatch(loggedInUser(null));
													}}
												>
													<a className="text-red-500 font-bold">Logout</a>
												</li>
											</ul>
										</div>
									) : (
										<Link className="btn" to={'/login'}>
											Login
										</Link>
									)
								}
							</div>
						</div>
					</div>
					{/* Page content here */}
					<Outlet />
				</div>
				<div className="drawer-side">
					<label
						htmlFor="my-drawer-3"
						aria-label="close sidebar"
						className="drawer-overlay"
					></label>
					<div className="menu p-4 w-80 min-h-full bg-base-200 flex justify-between">
						{/* Sidebar content here */}
						<ul>{navLinks}</ul>

						{currentUser?.user?.email || user?.email ? (
							<button
								className="btn"
								onClick={() => {
									removeToken();
									refetch();
									dispatch(loggedInUser(null));
								}}
							>
								Logout
							</button>
						) : (
							<Link className="btn" to={'/login'}>
								Login
							</Link>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default MainLayout;
