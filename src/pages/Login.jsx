import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineMail } from 'react-icons/ai';
import { BiLockAlt } from 'react-icons/bi';
import { PiEyeClosedLight, PiEyeLight } from 'react-icons/pi';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';
import {
	useGetCurrentUserQuery,
	useLoginUserMutation,
} from '../redux/api/apiService';
import { getToken, setToken } from '../utils/localDb';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
	loggedInUser,
	userLoading,
	userLoggedInError,
} from '../redux/features/auth/authSlice';

const schema = yup.object().shape({
	// name: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().min(8).max(32).required(),
});

const Login = () => {
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [isShowWelComeMessage, setIsShowWelComeMessage] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		setIsShowWelComeMessage(location.state === '/register');
	}, [location?.state]);

	const dispatch = useDispatch();
	const { data: currentUser, isLoading, refetch } = useGetCurrentUserQuery();

	const [loginUser, { data, isLoading: loginLoading, error }] =
		useLoginUserMutation();

	const { user, loading } = useSelector(state => state.auth);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmitHandler = async data => {
		dispatch(userLoading());
		try {
			const response = await loginUser(data);
			if (response?.data?.user) {
				dispatch(loggedInUser(response.data.user));
				refetch();
				navigate(location.pathname || '/', { replace: true });
			}
		} catch (err) {
			dispatch(userLoggedInError(err.toString()));
		}
	};

	useEffect(() => {
		if (data?.token && getToken() === null) {
			setToken(data?.token);
			reset();
			// navigate(location.state || '/', { replace: true });
		}
		if (error) {
			toast.error(error.data.message);
		}
	}, [data, error]);

	if (currentUser?.user || user) {
		return <Navigate to={'/'} replace />;
	} else if (loading || isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="min-w-screen min-h-[85vh]  flex items-center justify-center px-5 py-5">
			<div
				className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl overflow-hidden"
				style={{ minWidth: '600px' }}
			>
				{isShowWelComeMessage && (
					<p className="text-green-400 text-center mt-5">
						Welcome, Please Login to access you account
					</p>
				)}
				<div className="w-full py-10 px-5 md:px-10">
					<div className="text-center mb-10">
						<h1 className="font-bold text-3xl text-gray-900 font-gilda-display">
							LOGIN
						</h1>
						<p>Enter your credentials to access your account</p>
					</div>
					<form onSubmit={handleSubmit(onSubmitHandler)}>
						<div className="flex -mx-3">
							<div className="w-full px-3 mb-5">
								<label className="text-xs font-semibold px-1">Email</label>
								<div className="flex">
									<div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
										<AiOutlineMail />
									</div>
									<input
										type="email"
										{...register('email')}
										className="w-full text-base py-2 pl-3 rounded-md border-b border-gray-300 focus:outline-none focus:border-slate-500"
										placeholder="johnsmith@example.com"
									/>
								</div>
								<ErrorMessage
									errors={errors}
									name="email"
									render={({ message }) => (
										<label className="text-xs font-semibold px-1 text-red-500">
											{message}
										</label>
									)}
								/>
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
										{...register('password')}
										className="w-full text-base py-2 pl-3 rounded-md border-b border-gray-300 focus:outline-none focus:border-slate-500"
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
								<ErrorMessage
									errors={errors}
									name="password"
									render={({ message }) => (
										<label className="text-xs font-semibold px-1 text-red-500">
											{message}
										</label>
									)}
								/>
							</div>
						</div>

						<div className="flex -mx-3">
							<div className="w-full px-3 mb-5">
								<button
									disabled={loginLoading}
									className="block w-full mx-auto bg-[var(--primary-color)] hover:bg-[var(--primary-color-dark)] focus:bg-[var(--primary-color)] text-white rounded-lg px-3 py-3 font-semibold font-gilda-display"
								>
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
