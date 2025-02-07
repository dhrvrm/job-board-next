// import { requireAuth } from '@/app/hooks/server/requireAuth';
import { auth } from '@/lib/auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	imageUploader: f({
		image: {
			maxFileSize: '2MB',
			maxFileCount: 1,
		},
	})
		.middleware(async () => {
			const session = await auth();

			if (!session) {
				throw new UploadThingError('Unauthorized');
			}

			const userId = session.user?.id;
			if (!userId) {
				throw new UploadThingError('User ID not found');
			}

			return { userId };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log('Upload complete for userId:', metadata.userId);
			console.log('file url', file.url);

			return { uploadedBy: metadata.userId, url: file.url };
		}),

	resumeUploader: f({
		'application/pdf': {
			maxFileSize: '2MB',
			maxFileCount: 1,
		},
	})
		.middleware(async () => {
			const session = await auth();

			if (!session) {
				throw new UploadThingError('Unauthorized');
			}

			const userId = session.user?.id;
			if (!userId) {
				throw new UploadThingError('User ID not found');
			}

			return { userId };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log('Upload complete for userId:', metadata.userId);
			console.log('file url', file.url);

			return { uploadedBy: metadata.userId, url: file.url };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
