import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { BiLockAlt } from 'react-icons/bi';
import { PiEyeClosedLight, PiEyeLight } from 'react-icons/pi';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';
import { GrUserAdmin } from 'react-icons/gr';

import toast from 'react-hot-toast';
import { useCreateUserMutation } from '../redux/api/apiService';

const schema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().min(8).max(32).required(),
});

const Register = () => {
	const [isShowPassword, setIsShowPassword] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const [createUser, { data, isLoading, error }] = useCreateUserMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmitHandler = async data => {
		await createUser(data);
	};
	useEffect(() => {
		if (error?.status === 400) {
			toast.error(error.data.message);
		}
		if (data?.insertedId) {
			reset();
			navigate('/login', { state: location.pathname, replace: true });
		}
	}, [data?.insertedId, error]);

	return (
		<div className="min-h-[85vh] flex items-center justify-center px-5 py-5">
			<div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl overflow-hidden min-w-full md:min-w-[450px]">
				<div className="w-full py-10 px-5 md:px-10">
					<div className="text-center mb-10">
						<h1 className="font-bold text-3xl text-gray-900 font-gilda-display">
							REGISTER
						</h1>
						<p>Enter your information to register</p>
					</div>
					<form onSubmit={handleSubmit(onSubmitHandler)}>
						<div className="flex -mx-3">
							<div className="w-full px-3 mb-5">
								<label className="text-xs font-semibold  ml-10">Name</label>
								<div className="flex">
									<div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
										<AiOutlineUser className="text-[var(--primary-color)]" />
									</div>
									<input
										type="text"
										{...register('name')}
										className="w-full text-base py-2 pl-3 rounded-md border-b border-gray-300 focus:outline-none focus:border-slate-500"
										placeholder="John Doe"
									/>
								</div>
								<ErrorMessage
									errors={errors}
									name="name"
									render={({ message }) => (
										<label className="text-xs font-semibold  ml-10 text-red-500">
											{message}
										</label>
									)}
								/>
							</div>
						</div>
						<div className="flex -mx-3">
							<div className="w-full px-3 mb-5">
								<label className="text-xs font-semibold  ml-10">Role</label>
								<div className="flex">
									<div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
										<GrUserAdmin className="text-[var(--primary-color)]" />
									</div>
									<Controller
										name="role"
										control={control}
										defaultValue={''}
										render={({ field }) => (
											<select
												onChange={value => field.onChange(value)}
												className="select select-bordered w-full "
											>
												<option value={''}>Select Role</option>
												<option value={'admin'}>Admin</option>
												<option value={'manager'}>Manager</option>
												<option value={'member'}>Member</option>
											</select>
										)}
									/>
								</div>
								<ErrorMessage
									errors={errors}
									name="role"
									render={({ message }) => (
										<label className="text-xs font-semibold  ml-10 text-red-500">
											{message}
										</label>
									)}
								/>
							</div>
						</div>
						<div className="flex -mx-3">
							<div className="w-full px-3 mb-5">
								<label className="text-xs font-semibold ml-10">Email</label>
								<div className="flex">
									<div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
										<AiOutlineMail className="text-[var(--primary-color)]" />
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
										<label className="text-xs font-semibold  ml-10 text-red-500">
											{message}
										</label>
									)}
								/>
							</div>
						</div>

						<div className="flex -mx-3">
							<div className="w-full px-3 mb-12">
								<label className="text-xs font-semibold  ml-10">Password</label>
								<div className="flex relative">
									<div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
										<BiLockAlt className="text-[var(--primary-color)]" />
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
											<PiEyeClosedLight className="text-[var(--primary-color)]" />
										) : (
											<PiEyeLight className="text-[var(--primary-color)]" />
										)}
									</div>
								</div>
								<ErrorMessage
									errors={errors}
									name="password"
									render={({ message }) => (
										<label className="text-xs font-semibold  ml-10 text-red-500">
											{message}
										</label>
									)}
								/>
							</div>
						</div>
						<div className="flex -mx-3">
							<div className="w-full px-3 mb-5">
								<button
									disabled={isLoading}
									className="block w-full mx-auto bg-[var(--primary-color)] hover:bg-[var(--primary-color-dark)] focus:bg-[var(--primary-color)] text-white rounded-lg px-3 py-3 font-semibold font-gilda-display"
								>
									REGISTER NOW
								</button>
							</div>
						</div>
					</form>
					<p className="text-center">
						Already Have an account?{' '}
						<Link className="text-[var(--primary-color)]" to={'/login'}>
							Sign In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
