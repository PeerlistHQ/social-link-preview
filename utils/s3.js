import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const client = new S3Client({
	region: 'us-east-2',
	credentials: {
		accessKeyId: process.env.NEXT_PUBLIC_AWS_CLIENT_ID,
		secretAccessKey: process.env.NEXT_PUBLIC_AWS_CLIENT_SECRET,
	},
});

const s3 = {
	signedUrl: async (key, type = 'image/*') => {
		const command = new PutObjectCommand({
			Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
			Key: key,
			ContentType: type,
			ACL: 'public-read',
		});
		return await getSignedUrl(client, command, { expiresIn: 3600 });
	},
};

export default s3;
