import React from 'react';
import { toast } from 'react-toastify';
import Button from '../../../../../components/ui/Button';

const ReactToastifyExample2 = () => {
	const resolveAfter3Sec = new Promise((resolve) => {
		setTimeout(resolve, 3000);
	});

	const notify = () =>
		toast.promise(resolveAfter3Sec, {
			pending: 'Promise is pending',
			success: 'Promise resolved 👌',
			error: 'Promise rejected 🤯',
		});

	return (
		<Button variant='outline' onClick={notify} icon='HeroClock'>
			Promise
		</Button>
	);
};

export default ReactToastifyExample2;
