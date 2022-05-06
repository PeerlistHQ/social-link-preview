import generatePreview from '../../../../utils/generatePreview';

const shouldUpdatePreview = (user, data) => {
	if (user.firstName !== data.firstName) {
		return true;
	}
	if (user.lastName !== data.lastName) {
		return true;
	}
	if (user.headline !== data.headline) {
		return true;
	}
	return false;
};

const handler = async (req, res) => {
	const data = req.body;

	const user = {
		// This usually comes from the database
		firstName: 'Johnrao',
		lastName: 'Doekar',
		headline: 'Software Engineer',
		username: 'coolJohnrao',
	};

	const shouldGeneratePreview = shouldUpdatePreview(user, data);
	console.log('...updating user data to our database...');
	console.log('...updating user data to our database...');
	console.log('...updating user data to our database...');
	console.log('update finished!');

	if (shouldGeneratePreview) {
		try {
			await generatePreview({
				name: `${data.firstName} ${data.lastName}`,
				headline: data.headline,
				username: user.username || '/coolJohnrao', // Hardcoding because this is just for demo
			});
		} catch (e) {
			console.log('Could not update the preview: ', e);
			return res.status(400).json({
				success: false,
				error: 'Could not update the preview',
			});
		}
	}

	res.status(200).json({ success: true });
};

export default handler;
