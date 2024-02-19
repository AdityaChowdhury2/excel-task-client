import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegCalendar } from 'react-icons/fa';
import * as yup from 'yup';
import { useAddTaskMutation } from '../redux/api/apiService';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
	title: yup.string().required('Title is required'),
	description: yup.string().required('Description is required'),
	dueDate: yup.date().required('Due date is required'),
	priorityLevel: yup
		.string()
		.oneOf(['high', 'low', 'medium'], 'Invalid priority level')
		.required('Priority level is required'),
});

const AddTask = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});
	const [addTask] = useAddTaskMutation();
	const onSubmitHandler = async data => {
		const toastId = toast.loading('Adding Task ...');
		const response = await addTask(data);
		if (response.data?.insertedId) {
			toast.success('Task added successfully', { id: toastId });
			reset();
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
							<label className="text-xs font-semibold px-1">Title</label>
							<div className="flex">
								{/* <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
									<AiOutlineMail />
								</div> */}
								<input
									type="text"
									{...register('title')}
									className="w-full  px-3 py-2 bg-[#F9F9F9] rounded-lg border-2 border-gray-200 outline-none focus:border-[var(--primary-color)] focus:outline-none focus:ring-0"
									placeholder="Enter task Details..."
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

						<div className="w-full px-3 mb-5">
							<label className="text-xs font-semibold px-1">Description</label>
							<div className="flex relative">
								{/* <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"> */}
								{/* <BiLockAlt className="" /> */}
								{/* </div> */}
								<textarea
									type={'text'}
									{...register('description')}
									className="w-full px-3 py-2 bg-[#F9F9F9] rounded-lg border-2 border-gray-200 outline-none focus:border-[var(--primary-color)] focus:outline-none focus:ring-0"
									placeholder="Enter Task Description... "
								/>
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
										<select
											onChange={value => field.onChange(value)}
											className="select select-bordered w-full "
										>
											<option value={''}>Select Priority Level</option>
											<option value={'high'}>High</option>
											<option value={'medium'}>Medium</option>
											<option value={'low'}>Low</option>
										</select>
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
