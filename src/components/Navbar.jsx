// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetCurrentUserQuery } from '../redux/api/apiService';
import { removeToken } from '../utils/localDb';
import { useDispatch } from 'react-redux';
import { loggedInUser } from '../redux/features/auth/authSlice';

const Navbar = () => {
	// const {
	// 	loading,
	// 	user,
	// 	  error
	// } = useSelector(state => state.auth);
	const navLinks = (
		<>
			<li className="px-2">
				<a>Submenu 1</a>
			</li>
			<li className="px-2">
				<a>Submenu 2</a>
			</li>
		</>
	);
	const dispatch = useDispatch();
	const { data: currentUser, refetch } = useGetCurrentUserQuery();
	// console.log(currentUser);
	return (
		<div className="container navbar bg-base-100">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="flex flex-col gap-2 dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
						{navLinks}
					</ul>
				</div>
				<h5 className=" text-xl">Task Manager</h5>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="flex px-1">{navLinks}</ul>
			</div>
			<div className="navbar-end">
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
	);
};

export default Navbar;
