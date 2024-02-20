import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Select from 'react-select';
import {
	useAddProjectMutation,
	useGetUsersQuery,
} from '../redux/api/apiService';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import io from 'socket.io-client';
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

const socket = io.connect(import.meta.env.VITE_SERVER_URL);
const projectSchema = yup.object().shape({
	project_name: yup
		.string()
		.required('Name is required')
		.min(5, 'Name must be at least 5 characters long'),
	assigned_to: yup.string().required('Assigned to is required'),
});
const CreateProject = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(projectSchema),
	});

	// const navigate = useNavigate();
	const { data: restUsers, isLoading } = useGetUsersQuery('manager');
	// console.log(restUsers);

	const [
		addProject,
		{ data: addProjectResponse, isLoading: addProjectLoading },
	] = useAddProjectMutation();

	useEffect(() => {
		socket.connect();
		if (addProjectResponse?.insertedId) {
			console.log('Adding Task ...');
			socket.emit('createProject', addProjectResponse?.insertedId);
			socket.once('createProject', data => {
				console.log('Adding Task from socket');
				toast.success(`Project ${data.project_name} created successfully`);
			});
		}
		return () => {
			socket.disconnect();
		};
	}, [addProjectResponse]);

	const onSubmitHandler = async data => {
		// console.log(data);
		try {
			const response = await addProject(data);
			if (response.data?.insertedId) {
				// 	navigate('/');
				reset();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="min-w-screen min-h-[85vh]  flex items-center justify-center px-5 py-5">
			<div
				className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl overflow-hidden"
				style={{ minWidth: '600px' }}
			>
				<div className="w-full py-10 px-5 md:px-10">
					<div className="text-center mb-10">
						<h1 className="font-bold text-3xl text-gray-900 font-gilda-display">
							Create Project
						</h1>
					</div>
					<form onSubmit={handleSubmit(onSubmitHandler)}>
						<div className="w-full px-3 mb-5">
							<label className="text-xs font-semibold px-1">Project Name</label>
							<div className="flex">
								<input
									type="text"
									className="w-full  px-3 py-2 bg-[#F9F9F9] rounded-lg border-2 border-gray-200 outline-none focus:border-[var(--primary-color)] focus:outline-none focus:ring-0"
									placeholder="Enter Project Name"
									{...register('project_name')}
								/>
							</div>
							<ErrorMessage
								errors={errors}
								name="project_name"
								render={({ message }) => (
									<label className="text-xs font-semibold px-1 text-red-500">
										{message}
									</label>
								)}
							/>
						</div>
						<div className="w-full px-3 mb-5">
							<label className="text-xs font-semibold px-1">Assigned To</label>
							<div className="flex">
								<Controller
									name="assigned_to"
									control={control}
									render={({ field }) => (
										<Select
											className="w-full bg-[#F9F9F9] rounded-lg border-2 border-gray-200 outline-none focus:border-[var(--primary-color)] focus:outline-none focus:ring-0"
											defaultOptions
											getOptionValue={e => e._id}
											getOptionLabel={e => e.name}
											options={restUsers}
											placeholder="Select members"
											isLoading={isLoading}
											onChange={value => {
												field.onChange(value._id);
											}}
										/>
									)}
									rules={{ required: true }}
								/>
							</div>
							<ErrorMessage
								errors={errors}
								name="assigned_to"
								render={({ message }) => (
									<label className="text-xs font-semibold px-1 text-red-500">
										{message}
									</label>
								)}
							/>
						</div>
						<div className="flex ">
							<div className="w-full px-3 mb-5">
								<button
									disabled={addProjectLoading}
									className="block w-full mx-auto bg-[var(--primary-color)] hover:bg-[var(--primary-color-dark)] focus:bg-[var(--primary-color)] text-white rounded-lg px-3 py-3 font-semibold font-gilda-display"
								>
									Create Project
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateProject;
