import Head from 'next/head';
import Image from 'next/image';

const User = () => {
	const ogImage = `${process.env.NEXT_PUBLIC_PREFIX_URL}/previewDemo/thisisfordemo.png`;
	const user = {
		firstName: 'Johnrao',
		lastName: 'Doekar',
		headline: 'Building Peerlist',
		username: 'coolJohnrao',
		image: `${process.env.NEXT_PUBLIC_PREFIX_URL}/previewDemo/johnrao.jpeg`,
	};

	return (
		<div>
			<Head>
				<title>
					{user.firstName} {user.lastName} | Peerlist Profile
				</title>

				<meta property='og:image' content={ogImage} />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:image:src' content={ogImage} />
			</Head>
			<div>
				<div className='h-screen w-screen bg-slate-200 flex justify-center items-center'>
					<div className='bg-white w-2/5 border border-slate-400 p-4 rounded-md shadow-lg'>
						<div
							className={`relative flex items-start justify-between flex-1 h-full cursor-pointer hover:bg-gray-200 hover:border-gray-500 rounded-lg`}
						>
							<div className='flex w-full p-4'>
								<div className='mb-2'>
									<div className='w-48 h-48 rounded-full overflow-hidden'>
										<Image
											className={`w-48 h-48 bg-center bg-no-repeat bg-cover bg-white border border-primaryBorder flex justify-center items-center object-cover rounded-full`}
											src={user.image || '/images/emptyDP.png'}
											width={192}
											height={192}
											alt='User'
										/>
									</div>
								</div>
								<div className='ml-4 flex flex-col justify-center items-center w-full'>
									<Image
										src={'/favicon.ico'}
										width={48}
										height={48}
										alt='Peerlist'
									/>
									<h1 className='text-4xl text-primary font-semibold mt-4'>
										{user.firstName} {user.lastName}
									</h1>
									<p className='text-gray text-xl paragraph-clamp'>
										{user.headline}
									</p>
									<p className='mt-4 text-base text-green-700 paragraph-clamp'>
										https://peerlist.io/{user.username}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default User;
