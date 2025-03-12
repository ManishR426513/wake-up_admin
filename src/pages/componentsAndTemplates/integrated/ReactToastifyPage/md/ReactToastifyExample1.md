```tsx
import React from 'react';
import { toast } from 'react-toastify';
import Button from './components/ui/Button';
import Icon from './components/icon/Icon';

const ReactToastifyExample1 = () => {
	const notify = () =>
		toast('Wow so easy!', {
			// eslint-disable-next-line react/no-unstable-nested-components
			icon: () => <Icon icon='HeroCalendarDays' size='text-2xl' color='blue' />,
		});

	return (
		<Button variant='outline' onClick={notify} icon='HeroRocketLaunch'>
			Show Toast
		</Button>
	);
};

export default ReactToastifyExample1;
```
