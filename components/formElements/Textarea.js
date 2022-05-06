const Textarea = (props) => {
	const {
		id,
		labelClassName = '',
		placeholder = '',
		label = '',
		required = false,
		maxWordCount = 120,
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

			<textarea
				className={`p-2 text-sm border rounded-sm transition duration-150 ease-in-out focus-within:border-slate-900 border-slate-300 w-full outline-none bg-white`}
				id={id}
				placeholder={placeholder}
				columns={20}
				maxLength={maxWordCount}
				{...rest}
			></textarea>
		</div>
	);
};

export default Textarea;
