import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';
import Select from 'react-select';
import {
	useGetUsersQuery,
	useUpdateProjectByIdMutation,
} from '../redux/api/apiService';
import { useEffect, useState } from 'react';

const projectSchema = yup.object().shape({
	project_name: yup
		.string()
		.required('Name is required')
		.min(5, 'Name must be at least 5 characters long'),
	assigned_to: yup.string().required('Assigned to is required'),
});
const UpdateProjectModal = ({ project, handleCloseModal }) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(projectSchema),
	});

	const [options, setOptions] = useState([]);
	const [index, setIndex] = useState(0);
	const { data: restUsers, isLoading } = useGetUsersQuery('manager');

	const [updateProjectById] = useUpdateProjectByIdMutation();

	useEffect(() => {
		const user = restUsers?.map(user => {
			return { value: user._id, label: user.name };
		});
		setOptions(user);
		const index = restUsers?.findIndex(
			user => user._id === project.assigned_to
		);
		setIndex(index);
	}, [restUsers]);

	const onSubmitHandler = async data => {
		try {
			const response = await updateProjectById({ id: project._id, data });
			if (response.data.modifiedCount) handleCloseModal(project._id);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<dialog id={`update_project_modal_${project._id}`} className="modal">
			<div className="modal-box">
				<form method="dialog">
					{/* if there is a button in form, it will close the modal */}
					<button
						onClick={() => handleCloseModal(project._id)}
						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
					>
						✕
					</button>
				</form>
				<form onSubmit={handleSubmit(onSubmitHandler)}>
					<div className="w-full px-3 mb-5">
						<label className="text-xs font-semibold px-1">Project Name</label>
						<div className="flex">
							<input
								type="text"
								defaultValue={project.project_name}
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
					{options?.length && (
						<div className="w-full px-3 mb-5">
							<label className="text-xs font-semibold px-1">Assigned To</label>
							<div className="flex">
								<Controller
									name="assigned_to"
									control={control}
									defaultValue={options[index].value}
									render={({ field }) => (
										<Select
											defaultValue={options[index]}
											className="w-full bg-[#F9F9F9] rounded-lg border-2 border-gray-200 outline-none focus:border-[var(--primary-color)] focus:outline-none focus:ring-0"
											defaultOptions
											options={options}
											placeholder="Select Manager"
											isLoading={isLoading}
											onChange={opt => {
												// console.log(opt);
												field.onChange(opt.value);
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
					)}
					<div className="flex ">
						<div className="w-full px-3 mb-5">
							<button
								// disabled={addProjectLoading}
								className="block w-full mx-auto bg-[var(--primary-color)] hover:bg-[var(--primary-color-dark)] focus:bg-[var(--primary-color)] text-white rounded-lg px-3 py-3 font-semibold font-gilda-display"
							>
								Create Project
							</button>
						</div>
					</div>
				</form>
			</div>
		</dialog>
	);
};

export default UpdateProjectModal;

UpdateProjectModal.propTypes = {
	project: PropTypes.object.isRequired,
	handleCloseModal: PropTypes.func.isRequired,
};
