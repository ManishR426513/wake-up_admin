import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import Container from '../../../../components/layouts/Container/Container';
import rolesDb from '../../../../mocks/db/roles.db';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../components/ui/Card';
import Label from '../../../../components/form/Label';
import Input from '../../../../components/form/Input';
import Checkbox from '../../../../components/form/Checkbox';
import modulesDb from '../../../../mocks/db/modules.db';
import PERMISSION from '../../../../constants/permissions.constant';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
	SubheaderSeparator,
} from '../../../../components/layouts/Subheader/Subheader';
import { appPages } from '../../../../config/pages.config';
import Button from '../../../../components/ui/Button';
import Badge from '../../../../components/ui/Badge';
import useSaveBtn from '../../../../hooks/useSaveBtn';

const RolePage = () => {
	const { id } = useParams();

	const roleDb = rolesDb.find((i) => i.id === id);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isSaving, setIsSaving] = useState<boolean>(false);

	const formik = useFormik({
		initialValues: {
			id: roleDb?.id,
			name: roleDb?.name,
			modules: roleDb?.modules,
		},
		onSubmit: () => {},
	});

	const { saveBtnText, saveBtnColor, saveBtnDisable } = useSaveBtn({
		isNewItem: false,
		isSaving,
		isDirty: formik.dirty,
	});

	return (
		<PageWrapper name={formik.values.name}>
			<Subheader>
				<SubheaderLeft>
					<Link to={`../${appPages.crmAppPages.subPages.rolePage.subPages.listPage.to}`}>
						<Button icon='HeroArrowLeft' className='!px-0'>
							Back to List
						</Button>
					</Link>
					<SubheaderSeparator />
					{roleDb?.name}{' '}
					<Badge
						color='blue'
						variant='outline'
						rounded='rounded-full'
						className='border-transparent'>
						Edit Role
					</Badge>
				</SubheaderLeft>
				<SubheaderRight>
					<Button
						icon='HeroServer'
						variant='solid'
						color={saveBtnColor}
						isDisable={saveBtnDisable}
						onClick={() => formik.handleSubmit()}>
						{saveBtnText}
					</Button>
				</SubheaderRight>
			</Subheader>
			<Container>
				<div className='grid grid-cols-12 gap-4'>
					<div className='col-span-12'>
						<h1 className='my-4 font-bold'>Role Edit</h1>
					</div>
					<div className='col-span-12'>
						<Card>
							<CardHeader>
								<CardHeaderChild>
									<CardTitle>General Info</CardTitle>
								</CardHeaderChild>
							</CardHeader>
							<CardBody>
								<div className='grid grid-cols-12 gap-4'>
									<div className='col-span-12 lg:col-span-6'>
										<Label htmlFor='id'>ID</Label>
										<Input
											id='id'
											name='id'
											onChange={formik.handleChange}
											value={formik.values.id}
											disabled
										/>
									</div>
									<div className='col-span-12 lg:col-span-6'>
										<Label htmlFor='name'>name</Label>
										<Input
											id='name'
											name='name'
											onChange={formik.handleChange}
											value={formik.values.name}
										/>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-span-12'>
						<Card>
							<CardHeader>
								<CardHeaderChild>
									<CardTitle>General Info</CardTitle>
								</CardHeaderChild>
							</CardHeader>
							<CardBody>
								<div className='grid grid-cols-12 gap-4'>
									{modulesDb.map((module) => (
										<div className='col-span-12 lg:col-span-6' key={module.id}>
											<Label htmlFor={module.id}>{module.name}</Label>
											<div className='grid grid-cols-12 gap-4'>
												<Input
													className='col-span-3'
													type='number'
													id={module.id}
													name={module.id}
													max={7}
													min={0}
													onChange={(e) =>
														formik.setFieldValue(
															`modules.${module.id}`,
															e.target.value,
														)
													}
													// @ts-expect-error
													value={formik.values.modules[`${module.id}`]}
												/>
												{['read', 'write', 'execute'].map((i) => {
													return (
														<Checkbox
															className='col-span-3'
															variant='switch'
															key={i}
															id={`${module.id}-${i}`}
															name={i}
															label={
																i.charAt(0).toUpperCase() +
																i.slice(1)
															}
															onChange={() => {
																const newValues = {
																	...PERMISSION?.[
																		// @ts-expect-error
																		formik.values?.modules?.[
																			`${module.id}`
																		]
																	],

																	[`${i}`]:
																		!PERMISSION?.[
																			// @ts-expect-error
																			formik.values
																				?.modules?.[
																				`${module.id}`
																			]
																		]?.[`${i}`],
																};
																const filteredPermissions =
																	Object.values(PERMISSION).find(
																		(permission) => {
																			return (
																				permission.read ===
																					newValues.read &&
																				permission.write ===
																					newValues.write &&
																				permission.execute ===
																					newValues.execute
																			);
																		},
																	)?.value;
																formik
																	.setFieldValue('modules', {
																		...formik.values?.modules,
																		[`${module.id}`]:
																			filteredPermissions,
																	})
																	.then(() => {})
																	.catch(() => {});
															}}
															checked={
																PERMISSION?.[
																	// @ts-expect-error
																	formik.values?.modules?.[
																		`${module.id}`
																	]
																]?.[`${i}`]
															}
														/>
													);
												})}
											</div>
										</div>
									))}
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Container>
		</PageWrapper>
	);
};

export default RolePage;
