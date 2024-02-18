import { Link, NavLink, Outlet } from 'react-router-dom';
// import Navbar from '../components/Navbar';
import { RiMenu2Line } from 'react-icons/ri';
// import { useGetCurrentUserQuery } from '../redux/api/apiService';
import { useDispatch } from 'react-redux';
import { useGetCurrentUserQuery } from '../redux/api/apiService';
import { loggedInUser } from '../redux/features/auth/authSlice';
import { removeToken } from '../utils/localDb';

const MainLayout = () => {
	// const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery();

	const dispatch = useDispatch();
	const { data: currentUser, refetch } = useGetCurrentUserQuery();
	// console.log(currentUser);

	const navLinks = (
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
				<a>Sidebar Item 2</a>
			</li>
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
							<div className=" px-2 mx-2">Task Management</div>
							<ul className="hidden lg:flex flex-1 justify-center gap-4">
								{navLinks}
							</ul>
							<div className="flex-none hidden lg:block">
								{/* Navbar menu content here */}

								{currentUser?.user?.email ? (
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
												<a className="justify-between">
													Profile
													<span className="badge">New</span>
												</a>
											</li>
											<li>
												<a>Settings</a>
											</li>
											<li
												onClick={() => {
													removeToken();
													refetch();
													dispatch(loggedInUser(null));
												}}
											>
												<a>Logout</a>
											</li>
										</ul>
									</div>
								) : (
									<Link className="btn" to={'/login'}>
										Login
									</Link>
								)}
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

						{currentUser?.user?.email ? (
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
			{/* <Navbar /> */}
		</>
	);
};

export default MainLayout;
