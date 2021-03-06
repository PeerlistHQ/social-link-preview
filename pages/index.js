import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Button from '../components/formElements/Button';
import Input from '../components/formElements/Input';
import Textarea from '../components/formElements/Textarea';
import { updateUser } from '../utils/api';

export default function Home() {
	const [loading, setloading] = useState(false);
	const [error, setError] = useState(null);

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		const firstName = e.target.elements.firstName.value || '';
		const lastName = e.target.elements.lastName.value || '';
		const headline = e.target.elements.headline.value || '';
		const location = e.target.elements.location.value || '';
		const role = e.target.elements.role.value || '';

		const apiData = {
			firstName,
			lastName,
			headline,
			location,
			role,
		};

		try {
			setloading(true);
			await updateUser(apiData);
			if (error) {
				setError(null);
			}
		} catch (error) {
			setError(error?.response?.data?.error?.message || 'Something went wrong');
		} finally {
			setloading(false);
		}
	};

	return (
		<>
			<Head>
				<title>Social Preview Demo</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='h-screen w-screen bg-slate-200 flex justify-center items-center'>
				<div className='bg-white w-2/5 border border-slate-400 p-4 rounded-md shadow-lg'>
					<div className='flex justify-center mb-8'>
						<Image
							src='/images/peerlistLogo.svg'
							width={140}
							height={'100%'}
							alt='peerlist logo'
						/>
					</div>

					<form onSubmit={handleFormSubmit} className='mb-8'>
						<div className='grid grid-cols-2 gap-4'>
							<Input label='First Name' id='firstName' placeholder='Johnrao' />
							<Input label='Last Name' id='lastName' placeholder='Doekar' />
						</div>
						<div className='my-4'>
							<Textarea
								label='Headline'
								id='headline'
								placeholder='Building Peerlist'
							/>
						</div>
						<div className='grid grid-cols-2 gap-4 mb-4'>
							<Input
								label='Location'
								id='location'
								placeholder='Pune, MH, India'
							/>
							<Input label='Role' id='role' placeholder='Developer' />
						</div>

						<div className='flex justify-center'>
							<Button loading={loading} type='submit'>
								Save
							</Button>
						</div>

						{error && (
							<p className='text-sm mt-4 text-red-600 text-center'>{error}</p>
						)}
					</form>
				</div>
			</div>
		</>
	);
}
