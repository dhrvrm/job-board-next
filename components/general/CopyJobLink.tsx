'use client';

import { toast } from 'sonner';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { Link2 } from 'lucide-react';

const CopyJobLink = ({ jobURL }: { jobURL: string }) => {
	async function clipboardWrite() {
		try {
			await navigator.clipboard.writeText(jobURL);
			toast.success('URL coppied to clipboard!');
		} catch {
			console.log('Error: URL cannot be coppied');
			toast.error('Copy Process Failed, use the URL from the job.');
		}
	}
	return (
		<DropdownMenuItem onSelect={clipboardWrite}>
			<Link2 /> Copy
		</DropdownMenuItem>
	);
};

export default CopyJobLink;
