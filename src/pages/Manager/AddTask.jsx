import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Select from 'react-select';
import { FaRegCalendar } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
	useAddTaskMutation,
	useGetProjectsQuery,
	useGetUsersQuery,
} from '../../redux/api/apiService';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const schema = yup.object().shape({
	title: yup.string().required('Title is required'),
	description: yup.string().required('Description is required'),
	dueDate: yup.date().required('Due date is required'),
	projectId: yup.string().required('Select the project'),
	priorityLevel: yup
		.string()
		.oneOf(['high', 'low', 'medium'], 'Invalid priority level')
		.required('Priority level is required'),
	assigned: yup
		.array()
		.of(yup.string())
		.min(1, 'At least one member must be assigned'),
});

const AddTask = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		// reset,
	} = useForm({
		resolver: yupResolver(schema),
	});
	const { data: projects, isLoading: isProjectLoading } = useGetProjectsQuery();
	const [memberOptions, setMemberOptions] = useState([]);
	const [projectOptions, setProjectOptions] = useState([]);
	const { data: restUsers, isLoading } = useGetUsersQuery('member');
	const navigate = useNavigate();

	useEffect(() => {
		const user = restUsers?.map(user => {
			return { value: user._id, label: user.name };
		});
		setMemberOptions(user);
		const project = projects?.map(project => {
			return { value: project._id, label: project.project_name };
		});
		setProjectOptions(project);
		// const index = restUsers?.findIndex(
		// 	user => user._id === project.assigned_to
		// );
		// setIndex(index);
	}, [restUsers, projects]);
	const [addTask] = useAddTaskMutation();
	const onSubmitHandler = async data => {
		console.log(data);
		const toastId = toast.loading('Adding Task ...');
		const response = await addTask(data);
		if (response.data?.insertedId) {
			toast.success('Task added successfully', { id: toastId });
			navigate('/');
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
							Add New Task
						</h1>
					</div>
					<form onSubmit={handleSubmit(onSubmitHandler)}>
						<div className="w-full px-3 mb-5">
							<label className="text-xs font-semibold px-1">Project Name</label>
							<div className=" form-control">
								<Controller
									name="projectId"
									control={control}
									render={({ field }) => (
										<Select
											className="w-full bg-[#F9F9F9] rounded-lg border-2 border-gray-200 outline-none focus:border-[var(--primary-color)] focus:outline-none focus:ring-0"
											defaultOptions
											options={projectOptions}
											placeholder="Select project"
											isLoading={isProjectLoading}
											onChange={option => {
												console.log(option);
												field.onChange(option.value);
											}}
										/>
									)}
								/>
							</div>
							<ErrorMessage
								errors={errors}
								name="projectId"
								render={({ message }) => (
									<label className="text-xs font-semibold px-1 text-red-500">
										{message}
									</label>
								)}
							/>
						</div>
						<div className="w-full px-3 mb-5">
							<label className="text-xs font-semibold px-1">Title</label>
							<div className="flex">
								{/* <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
									<AiOutlineMail />
								</div> */}
								<input
									type="text"
									{...register('title')}
									className="w-full  px-3 py-2 bg-[#F9F9F9]rounded-lg border-2 border-gray-200 outline-none focus:border-[var(--primary-color)] focus:outline-none focus:ring-0"
									placeholder="Enter task Details..."
								/>
							</div>
							<ErrorMessage
								errors={errors}
								name="title"
								render={({ message }) => (
									<label className="text-xs font-semibold px-1 text-red-500">
										{message}
									</label>
								)}
							/>
						</div>

						<div className="w-full px-3 mb-5">
							<label className="text-xs font-semibold px-1">Description</label>
							<div className="flex relative">
								<textarea
									type={'text'}
									{...register('description')}
									className="w-full px-3 py-2 bg-[#F9F9F9] rounded-lg border-2 border-gray-200 outline-none focus:border-[var(--primary-color)] focus:outline-none focus:ring-0"
									placeholder="Enter Task Description... "
								/>
							</div>
							<ErrorMessage
								errors={errors}
								name="description"
								render={({ message }) => (
									<label className="text-xs font-semibold px-1 text-red-500">
										{message}
									</label>
								)}
							/>
						</div>
						<div className="w-full px-3 mb-5">
							<label className="text-xs font-semibold px-1">
								Priority Level
							</label>
							<div className="flex relative">
								<Controller
									name="priorityLevel"
									control={control}
									defaultValue={''}
									render={({ field }) => (
										<Select
											className="w-full bg-[#F9F9F9] rounded-lg border-2 border-gray-200 outline-none focus:border-[var(--primary-color)] focus:outline-none focus:ring-0"
											defaultOptions
											options={[
												{ value: 'high', label: 'High' },
												{ value: 'medium', label: 'Medium' },
												{ value: 'low', label: 'Low' },
											]}
											placeholder="Select Priority Level"
											onChange={option => {
												console.log(option);
												field.onChange(option.value);
											}}
										/>
									)}
								/>
							</div>
							<ErrorMessage
								errors={errors}
								name="priorityLevel"
								render={({ message }) => (
									<label className="text-xs font-semibold px-1 text-red-500">
										{message}
									</label>
								)}
							/>
						</div>
						{memberOptions?.length && (
							<div className="w-full px-3 mb-5">
								<label className="text-xs font-semibold px-1">
									Assign Members
								</label>
								<div className=" form-control">
									<Controller
										name="assigned"
										control={control}
										render={({ field }) => (
											<Select
												isMulti
												className="w-full bg-[#F9F9F9] rounded-lg border-2 border-gray-200 outline-none focus:border-[var(--primary-color)] focus:outline-none focus:ring-0"
												defaultOptions
												options={memberOptions}
												placeholder="Select Members"
												isLoading={isLoading}
												onChange={option => {
													console.log(option);
													field.onChange(option.map(option => option.value));
												}}
											/>
										)}
									/>
								</div>
								<ErrorMessage
									errors={errors}
									name="assigned"
									render={({ message }) => (
										<label className="text-xs font-semibold px-1 text-red-500">
											{message}
										</label>
									)}
								/>
							</div>
						)}
						<div className="w-full px-3 mb-12 ">
							<label className="text-xs font-semibold px-1">Due Date</label>
							<div className=" form-control">
								<Controller
									control={control}
									name="dueDate"
									render={({ field }) => (
										<DatePicker
											showIcon
											dateFormat="d MMM yyyy"
											minDate={new Date()}
											selected={field?.value ? field?.value : null}
											showTimeSelect={false}
											dropdownMode="select"
											isClearable
											placeholderText="Click to select time"
											shouldCloseOnSelect
											onChange={date => field.onChange(date)}
											calendarIconClassname="mt-2"
											className="input input-bordered w-full"
											icon={<FaRegCalendar />}
										/>
									)}
								/>
							</div>
							<ErrorMessage
								errors={errors}
								name="dueDate"
								render={({ message }) => (
									<label className="text-xs font-semibold px-1 text-red-500">
										{message}
									</label>
								)}
							/>
						</div>

						<div className="w-full px-3 mb-5">
							<button
								// disabled={isLoading}
								className="block w-full mx-auto bg-[var(--primary-color)] hover:bg-[var(--primary-color-dark)] focus:bg-[var(--primary-color)] text-white rounded-lg px-3 py-3 font-semibold font-gilda-display"
							>
								Add Task
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddTask;
