import React, { Dispatch, FC, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import Button, { IButtonProps } from '../../../../components/ui/Button';
import PERIOD, { TPeriod } from '../../../../constants/periods.constant';
import Icon from '../../../../components/icon/Icon';

interface IPeriodButtonsPartialProps {
	activeTab: TPeriod;
	setActiveTab: Dispatch<SetStateAction<TPeriod>>;
}
const PeriodButtonsPartial: FC<IPeriodButtonsPartialProps> = (props) => {
	const { activeTab, setActiveTab } = props;

	const defaultProps: IButtonProps = {
		size: 'sm',
		color: 'zinc',
		rounded: 'rounded-full',
	};
	const activeProps: IButtonProps = {
		...defaultProps,
		isActive: true,
		color: 'blue',
		colorIntensity: '500',
		variant: 'solid',
	};

	return (
		<div className='flex rounded-full border-2 border-zinc-500/20 p-1 drop-shadow-xl dark:border-zinc-800'>
			{Object.values(PERIOD).map((i) => (
				<Button
					key={i.text}
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...(activeTab.text === i.text ? { ...activeProps } : { ...defaultProps })}
					onClick={() => {
						setActiveTab(i);
						toast.success(`Data is shown for 1 ${i.text}.`, {
							icon: () => (
								<Icon icon='HeroCalendarDays' size='text-2xl' color='blue' />
							),
						});
					}}>
					{i.text}
				</Button>
			))}
		</div>
	);
};

export default PeriodButtonsPartial;
