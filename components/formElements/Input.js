const Input = (props) => {
	const {
		id,
		containerClassName = '',
		labelClassName = '',
		inputClassName = '',
		placeholder = '',
		label = '',
		type = 'text',
		error = '',
		required = false,
		disabled = false,
		...rest
	} = props;

	return (
		<div>
			<label
				htmlFor={id}
				className={`text-sm select-none text-gray-800 placeholder-slate-600 ${labelClassName}`}
			>
				{label} {required && <span className='text-red-800'>*</span>}
			</label>

			<input
				type={type}
				className={`w-full p-2 outline-none text-sm border rounded-sm transition duration-150 ease-in-out focus-within:border-slate-900 border-slate-300 ${
					disabled
						? 'bg-slate-400 cursor-not-allowed'
						: 'bg-white text-gray-800'
				} ${inputClassName}`}
				id={id}
				placeholder={placeholder}
				disabled={disabled}
				{...rest}
			/>
		</div>
	);
};

export default Input;
