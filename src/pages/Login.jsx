import { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BiLockAlt } from 'react-icons/bi';
import { PiEyeClosedLight, PiEyeLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const Login = () => {
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [userForm, setUserForm] = useState({});
	const handleInputField = e => {
		setUserForm({ ...userForm, [e.target.name]: e.target.value });
	};
	const handleFormSubmit = e => {
		e.preventDefault();
	};

	return (
		<div className="min-w-screen min-h-[85vh]  flex items-center justify-center px-5 py-5">
			<div
				className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl overflow-hidden"
				style={{ maxWidth: '1000px' }}
			>
				<div className="w-full py-10 px-5 md:px-10">
					<div className="text-center mb-10">
						<h1 className="font-bold text-3xl text-gray-900 font-gilda-display">
							LOGIN
						</h1>
						<p>Enter your credentials to access your account</p>
					</div>
					<form onSubmit={handleFormSubmit}>
						<div className="flex -mx-3">
							<div className="w-full px-3 mb-5">
								<label className="text-xs font-semibold px-1">Email</label>
								<div className="flex">
									<div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
										<AiOutlineMail />
									</div>
									<input
										type="email"
										name="email"
										className="w-full -ml-10 pl-10 pr-3 py-2 bg-[#F9F9F9] rounded-lg border-2 border-gray-200 outline-none focus:border-[#C19B76] focus:outline-none focus:ring-0"
										placeholder="johnsmith@example.com"
										onChange={handleInputField}
									/>
								</div>
							</div>
						</div>
						<div className="flex -mx-3">
							<div className="w-full px-3 mb-12">
								<label className="text-xs font-semibold px-1">Password</label>
								<div className="flex relative">
									<div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
										<BiLockAlt className="" />
									</div>
									<input
										type={isShowPassword ? 'text' : 'password'}
										name="password"
										onChange={handleInputField}
										className="w-full -ml-10 pl-10 pr-3 py-2 bg-[#F9F9F9] rounded-lg border-2 border-gray-200 outline-none focus:border-[#C19B76] focus:outline-none focus:ring-0"
										placeholder="************"
									/>
									<div
										className="absolute top-1/3 right-3 cursor-pointer"
										onClick={() => setIsShowPassword(!isShowPassword)}
									>
										{isShowPassword ? (
											<PiEyeClosedLight className="" />
										) : (
											<PiEyeLight className="" />
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="flex -mx-3">
							<div className="w-full px-3 mb-5">
								<button className="block w-full max-w-xs mx-auto bg-[#C19B76] hover:bg-[#b89470] focus:bg-[#C19B76] text-white rounded-lg px-3 py-3 font-semibold font-gilda-display">
									LOGIN NOW
								</button>
							</div>
						</div>
					</form>
					<p className="text-center">
						Create New Account?{' '}
						<Link className="text-" to={'/register'}>
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
