const Button = (props) => {
	const { className = '', children, loading, ...rest } = props;

	return (
		<button
			className={`border font-medium text-center transition-all ease-in duration-75 outline-0 focus:outline-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center rounded leading-120 select-none h-8 px-4 text-sm bg-green-600 text-white border-transparent hover:bg-green-700 ${className} `}
			type='button'
			{...rest}
		>
			{loading ? (
				<div className='w-4 h-4 border-2 loader-right-transparent-border rounded-full animate-spin mx-auto' />
			) : (
				children
			)}
		</button>
	);
};

export default Button;
