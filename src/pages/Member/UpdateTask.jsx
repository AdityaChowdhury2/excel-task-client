import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegCalendar } from 'react-icons/fa';
import * as yup from 'yup';
import { useLoaderData, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
	// useGetTasksQuery,
	useUpdateTaskByIdMutation,
} from '../../redux/api/apiService';
import { useEffect } from 'react';
import useSocket from '../../hooks/useSocket';

const statusOptions = [
	{
		label: 'To-do',
		value: 'todo',
	},
	{
		label: 'In Progress',
		value: 'inprogress',
	},
	{
		label: 'Completed',
		value: 'completed',
	},
];
const schema = yup.object().shape({
	status: yup
		.string()
		.oneOf(['todo', 'inprogress', 'completed'], 'Invalid status')
		.required('Status is required'),
});
const UpdateTask = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const navigate = useNavigate();
	const [data] = useLoaderData();
	const socket = useSocket();
	// const { refetch } = useGetTasksQuery();

	const {
		_id,
		project_name,
		title,
		description,
		priorityLevel,
		manager,
		managerEmail,
		dueDate,
	} = data;
	const [updateTaskById, { data: updateTaskByIdResponse, isLoading }] =
		useUpdateTaskByIdMutation();

	// console.log(updateTaskByIdResponse);
	useEffect(() => {
		if (socket === null) return;
		// console.log('here...');
		if (updateTaskByIdResponse?.modifiedCount) {
			console.log('socket emitting...');
			socket.emit('updateTask', { _id });
			// socket.on('updateTask', () => {
			// 	refetch();
			// });
			// socket.once('updateTask', data => {
			// 	toast.success(`Task ${data.title} updated successfully`);
			// });
		}
		return () => {
			socket.off('updateTask');
		};
	}, [updateTaskByIdResponse, socket, managerEmail]);

	const onSubmitHandler = async data => {
		const toastId = toast.loading('Task status Updating...');
		const response = await updateTaskById({ id: _id, updates: data });
		if (response.data.modifiedCount) {
			toast.success('Task Status updated successfully', { id: toastId });
			navigate('/my-tasks');
		} else {
			toast.error('Task Status Failed', { id: toastId });
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
							Update Task
						</h1>
					</div>
					<form onSubmit={handleSubmit(onSubmitHandler)}>
						<div className="w-full px-3 mb-5">
							<label className="text-xs font-semibold px-1">Project Name</label>
							<div className=" form-control">
								<input
									type="text"
									disabled
									value={project_name}
									className="w-full  px-3 py-2 bg-[#F9F9F9] rounded-lg border-2 border-gray-200 outline-none focus:border-[var(--primary-color)] focus:outline-none focus:ring-0"
								/>
							</div>
						</div>
						<div className="w-full px-3 mb-5">
							<label className="text-xs font-semibold px-1">Title</label>
							<div className="flex">
								<input
									type="text"
									disabled
									value={title}
									className="w-full  px-3 py-2 bg-[#F9F9F9] rounded-lg border-2 border-gray-200 outline-none focus:border-[var(--primary-color)] focus:outline-none focus:ring-0"
									placeholder="Enter task Details..."
								/>
							</div>
						</div>
						<div className="w-full px-3 mb-5">
							<label className="text-xs font-semibold px-1">Description</label>
							<div className="flex relative">
								<textarea
									type={'text'}
									disabled
									value={description}
									className="w-full px-3 py-2 bg-[#F9F9F9] rounded-lg border-2 border-gray-200 outline-none focus:border-[var(--primary-color)] focus:outline-none focus:ring-0"
									placeholder="Enter Task Description... "
								/>
							</div>
						</div>
						<div className="w-full px-3 mb-5">
							<label className="text-xs font-semibold px-1">
								Priority Level
							</label>
							<div className="flex relative">
								<input
									type="text"
									disabled
									value={priorityLevel.toUpperCase()}
									className="w-full  px-3 py-2 bg-[#F9F9F9] rounded-lg border-2 border-gray-200 outline-none focus:border-[var(--primary-color)] focus:outline-none focus:ring-0"
								/>
							</div>
						</div>
						<div className="w-full px-3 mb-5">
							<label className="text-xs font-semibold px-1">Manager</label>
							<div className=" form-control">
								<input
									type="text"
									disabled
									value={manager}
									className="w-full  px-3 py-2 bg-[#F9F9F9] rounded-lg border-2 border-gray-200 outline-none focus:border-[var(--primary-color)] focus:outline-none focus:ring-0"
									placeholder="Enter task Details..."
								/>
							</div>
						</div>
						<div className="w-full px-3 mb-5">
							<label className="text-xs font-semibold px-1">
								Status{' '}
								<span className="text-green-500">
									(only status can be changed)
								</span>
							</label>
							<div className="flex relative">
								<Controller
									name="status"
									control={control}
									defaultValue={
										statusOptions[
											statusOptions.findIndex(
												status => status.value === data.status
											)
										].value
									}
									render={({ field }) => (
										<Select
											defaultValue={
												statusOptions[
													statusOptions.findIndex(
														status => status.value === data.status
													)
												]
											}
											className="w-full bg-[#F9F9F9] rounded-lg border-2 border-gray-200 outline-none focus:border-[var(--primary-color)] focus:outline-none focus:ring-0"
											defaultOptions
											options={statusOptions}
											placeholder="Select status"
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
								name="status"
								render={({ message }) => (
									<label className="text-xs font-semibold px-1 text-red-500">
										{message}
									</label>
								)}
							/>
						</div>

						<div className="w-full px-3 mb-12 ">
							<label className="text-xs font-semibold px-1">Due Date</label>
							<div className=" form-control">
								<DatePicker
									showIcon
									dateFormat="d MMM yyyy"
									minDate={new Date()}
									selected={dueDate}
									disabled
									showTimeSelect={false}
									dropdownMode="select"
									isClearable
									placeholderText="Click to select time"
									shouldCloseOnSelect
									calendarIconClassname="mt-2"
									className="input input-bordered w-full"
									icon={<FaRegCalendar />}
								/>
							</div>
						</div>
						<div className="w-full px-3 mb-5">
							<button
								disabled={isLoading}
								className={`${
									isLoading ? 'hover:cursor-not-allowed' : ''
								} block w-full mx-auto bg-[var(--primary-color)] hover:bg-[var(--primary-color-dark)] focus:bg-[var(--primary-color)] text-white rounded-lg px-3 py-3 font-semibold font-gilda-display`}
							>
								Update Status
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UpdateTask;
