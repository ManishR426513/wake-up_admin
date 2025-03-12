import React, { useState } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../components/ui/Card';
import { IChartOptions } from '../../../../interface/chart.interface';
import Chart from '../../../../components/Chart';
import { BalanceIcon } from '../../../../components/Balance';

const ChartPartial = () => {
	const [state] = useState<IChartOptions>({
		series: [
			{
				name: 'Page view',
				data: [180, 217, 196, 243, 223, 298, 321],
			},
		],
		options: {
			chart: {
				height: 290,
				type: 'area',
				toolbar: {
					show: false,
				},
			},
			dataLabels: {
				// enabled: true,
			},
			stroke: {
				curve: 'smooth',
			},
			markers: {
				size: 5,
			},
			xaxis: {
				categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				title: {
					text: 'Days',
				},
				tickPlacement: 'on',
			},
			yaxis: {
				show: false,
				min: 100,
			},
			grid: {
				show: false,
			},
			fill: {
				type: 'gradient',
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.3,
					opacityTo: 0,
				},
			},
		},
	});

	return (
		<Card className='h-full'>
			<CardHeader>
				<CardHeaderChild>
					<CardTitle>Daily View</CardTitle>
				</CardHeaderChild>
			</CardHeader>
			<CardBody>
				<div className='flex items-baseline gap-2 text-sm'>
					<div className='text-6xl font-semibold'>
						~218<span className='opacity-50'>.34</span>
					</div>
					<div className='flex items-center gap-1.5'>
						<span className='text-emerald-500'>23%</span>
						<BalanceIcon status='positive' />
					</div>
				</div>
				<Chart series={state.series} options={state.options} type='area' height={290} />
			</CardBody>
		</Card>
	);
};

export default ChartPartial;
