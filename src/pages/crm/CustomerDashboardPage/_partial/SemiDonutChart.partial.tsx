import React, { useState } from 'react';
import dayjs from 'dayjs';
import Card, { CardBody } from '../../../../components/ui/Card';
import Chart from '../../../../components/Chart';
import { IChartOptions } from '../../../../interface/chart.interface';

const SemiDonutChartPartial = () => {
	const [state] = useState<IChartOptions>({
		series: [
			{
				name: 'Blue',
				data: [
					{
						x: dayjs().add(-2, 'month').format('MMMM'),
						y: 503,
					},
					{
						x: dayjs().add(-1, 'month').format('MMMM'),
						y: 580,
					},
					{
						x: dayjs().format('MMMM'),
						y: 135,
					},
				],
			},
			{
				name: 'Green',
				data: [
					{
						x: dayjs().add(-2, 'month').format('MMMM'),
						y: 733,
					},
					{
						x: dayjs().add(-1, 'month').format('MMMM'),
						y: 385,
					},
					{
						x: dayjs().format('MMMM'),
						y: 715,
					},
				],
			},
			{
				name: 'Orange',
				data: [
					{
						x: dayjs().add(-2, 'month').format('MMMM'),
						y: 255,
					},
					{
						x: dayjs().add(-1, 'month').format('MMMM'),
						y: 211,
					},
					{
						x: dayjs().format('MMMM'),
						y: 441,
					},
				],
			},
			{
				name: 'Red',
				data: [
					{
						x: dayjs().add(-2, 'month').format('MMMM'),
						y: 428,
					},
					{
						x: dayjs().add(-1, 'month').format('MMMM'),
						y: 749,
					},
					{
						x: dayjs().format('MMMM'),
						y: 559,
					},
				],
			},
		],
		options: {
			chart: {
				height: 350,
				width: 600,
				type: 'line',
			},
			plotOptions: {
				line: {
					isSlopeChart: true,
				},
			},
			tooltip: {
				followCursor: true,
				intersect: false,
				shared: true,
			},
			dataLabels: {
				background: {
					enabled: true,
				},
				formatter(val, opts) {
					const seriesName = opts.w.config.series[opts.seriesIndex].name;

					return val !== null ? seriesName : '';
				},
			},
			yaxis: {
				show: true,
				labels: {
					show: true,
				},
			},
			xaxis: {
				position: 'bottom',
			},
			legend: {
				show: true,
				position: 'top',
				horizontalAlign: 'left',
			},
			stroke: {
				width: [2, 3, 4, 2],
				dashArray: [0, 0, 5, 2],
				curve: 'smooth',
			},
		},
	});

	return (
		<Card className='h-full'>
			<CardBody>
				<Chart
					series={state.series}
					options={state.options}
					type={state.options.chart?.type}
					height={440}
				/>
			</CardBody>
		</Card>
	);
};

export default SemiDonutChartPartial;
