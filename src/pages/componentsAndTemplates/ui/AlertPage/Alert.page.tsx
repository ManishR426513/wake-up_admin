import React, { useRef, useState } from 'react';
import useScrollSpy from 'react-use-scrollspy';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import Container from '../../../../components/layouts/Container/Container';
import MdViewer from '../../../../components/MdViewer';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../components/ui/Card';
import AlertExample1MD from './md/AlertExample1.md';
import AlertExample2MD from './md/AlertExample2.md';
import AlertInterfaceMd from './md/AlertInterface.md';
import Alert, { TAlertVariants } from '../../../../components/ui/Alert';
import Button from '../../../../components/ui/Button';
import ButtonGroup from '../../../../components/ui/ButtonGroup';
import { arrBorderWidth } from '../../../../types/borderWidth.type';
import { arrColorIntensity } from '../../../../types/colorIntensities.type';
import { arrColors } from '../../../../types/colors.type';
import { arrFontSizes } from '../../../../types/fontSizes.type';
import { arrRounded } from '../../../../types/rounded.type';
import Doc, { DocContent, DocNav } from '../../../../templates/for-demo/Doc';
import ExampleView from '../../../../templates/for-demo/ExampleView';
import Subheader, { SubheaderLeft } from '../../../../components/layouts/Subheader/Subheader';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import Table, { TBody, Td, Th, THead, Tr } from '../../../../components/ui/Table';
import Icon from '../../../../components/icon/Icon';
import Checkbox from '../../../../components/form/Checkbox';
import Visible from '../../../../components/utils/Visible';
import themeConfig from '../../../../config/theme.config';
import Tooltip from '../../../../components/ui/Tooltip';

const AlertPage = () => {
	const sectionRefs = [
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
	];
	const activeSection = useScrollSpy({
		sectionElementRefs: sectionRefs,
		offsetPx: -90,
	});

	const [previewVariant, setPreviewVariant] = useState<TAlertVariants>('solid');

	const PreviewSettings = (
		<ButtonGroup>
			<Button
				isActive={previewVariant === 'solid'}
				onClick={() => setPreviewVariant('solid')}>
				Solid
			</Button>
			<Button
				isActive={previewVariant === 'outline'}
				onClick={() => setPreviewVariant('outline')}>
				Outline
			</Button>
			<Button
				isActive={previewVariant === 'default'}
				onClick={() => setPreviewVariant('default')}>
				Default
			</Button>
		</ButtonGroup>
	);

	const [apiStatus, setApiStatus] = useState<boolean>(false);

	return (
		<PageWrapper name='Alert'>
			<Subheader>
				<SubheaderLeft>
					<Breadcrumb path='Components & Templates / UI' currentPage='Alert' />
				</SubheaderLeft>
			</Subheader>
			<Container>
				<Doc>
					<DocContent>
						<div
							id='Examples'
							ref={sectionRefs[0]}
							className='scroll-mt-offset col-span-12'>
							<span className='text-3xl font-semibold'>Examples</span>
						</div>
						<div className='col-span-12 md:col-span-6'>
							<ExampleView title='Example 1' mdFile={AlertExample1MD as RequestInfo}>
								<Card>
									<CardBody>
										<Alert
											className='border-transparent'
											color='amber'
											icon='HeroBeaker'
											title='Example Alert!'
											variant='solid'>
											You can use props and tailwind's class names as needed
											for your design.
										</Alert>
									</CardBody>
								</Card>
							</ExampleView>
						</div>
						<div className='col-span-12 md:col-span-6'>
							<ExampleView title='Example 1' mdFile={AlertExample2MD as RequestInfo}>
								<Card>
									<CardBody>
										<Alert
											className='border-transparent'
											title='Example Alert!'
											variant='outline'
											isClosable>
											You can use props and tailwind's class names as needed
											for your design.
										</Alert>
									</CardBody>
								</Card>
							</ExampleView>
						</div>
						<div
							id='Interface'
							ref={sectionRefs[1]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle>API</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>
										<label htmlFor='api' className='cursor-pointer'>
											Table
										</label>
										<Checkbox
											id='api'
											variant='switch'
											checked={apiStatus}
											onChange={() => setApiStatus(!apiStatus)}
											label='TypeScript'
										/>
									</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<Visible is={!apiStatus}>
										<Table>
											<THead>
												<Tr>
													<Th align='left'>Prop</Th>
													<Th align='left'>Type</Th>
													<Th
														align='left'
														className='italic text-zinc-500'>
														Examples
													</Th>
													<Th align='left'>Required</Th>
													<Th align='left'>Default</Th>
												</Tr>
											</THead>
											<TBody>
												<Tr>
													<Td>borderWidth</Td>
													<Td>
														<code>TBorderWidth</code>
													</Td>
													<Td className='italic text-zinc-500'>
														'border' | 'border-2' | 'border-4' |
														'border-8' | 'border-0'
													</Td>
													<Td>
														<Icon icon='HeroXMark' color='red' />
													</Td>
													<Td>
														<Tooltip text={themeConfig.borderWidth}>
															<code>themeConfig.borderWidth</code>
														</Tooltip>
													</Td>
												</Tr>
												<Tr>
													<Td>children</Td>
													<Td>
														<code>ReactNode</code>
													</Td>
													<Td className='italic text-zinc-500'>-</Td>
													<Td>
														<Icon icon='HeroCheck' color='emerald' />
													</Td>
													<Td>-</Td>
												</Tr>
												<Tr>
													<Td>className</Td>
													<Td>
														<code>string</code>
													</Td>
													<Td className='italic text-zinc-500'>-</Td>
													<Td>
														<Icon icon='HeroXMark' color='red' />
													</Td>
													<Td>-</Td>
												</Tr>
												<Tr>
													<Td>color</Td>
													<Td>
														<code>TColors</code>
													</Td>
													<Td className='italic text-zinc-500'>
														'zinc' | 'red' | 'amber' | 'lime' |
														'emerald' | 'sky' | 'blue' | 'violet'
													</Td>
													<Td>
														<Icon icon='HeroXMark' color='red' />
													</Td>
													<Td>
														<Tooltip text={themeConfig.themeColor}>
															<code>themeConfig.themeColor</code>
														</Tooltip>
													</Td>
												</Tr>
												<Tr>
													<Td>colorIntensity</Td>
													<Td>
														<code>TColorIntensity</code>
													</Td>
													<Td className='italic text-zinc-500'>
														'50' | '100' | '200' | '300' | '400' | '500'
														| '600' | '700' | '800' | '900' | '950'
													</Td>
													<Td>
														<Icon icon='HeroXMark' color='red' />
													</Td>
													<Td>
														<Tooltip text={themeConfig.themeColorShade}>
															<code>themeConfig.themeColorShade</code>
														</Tooltip>
													</Td>
												</Tr>
												<Tr>
													<Td>icon</Td>
													<Td>
														<code>TIcons</code>
													</Td>
													<Td className='italic text-zinc-500'>
														TDuotoneIcons | THeroIcons | string
													</Td>
													<Td>
														<Icon icon='HeroXMark' color='red' />
													</Td>
													<Td>-</Td>
												</Tr>
												<Tr>
													<Td>iconSize</Td>
													<Td>
														<code>TFontSizes</code>
													</Td>
													<Td className='italic text-zinc-500'>
														'text-xs' | 'text-sm' | 'text-base' |
														'text-lg' | 'text-xl' | 'text-2xl' |
														'text-3xl' | 'text-4xl' | 'text-5xl' |
														'text-6xl' | 'text-7xl' | 'text-8xl' |
														'text-9xl'
													</Td>
													<Td>
														<Icon icon='HeroXMark' color='red' />
													</Td>
													<Td>
														<code>'text-3xl'</code>
													</Td>
												</Tr>
												<Tr>
													<Td>isClosable</Td>
													<Td>
														<code>boolean</code>
													</Td>
													<Td className='italic text-zinc-500'>-</Td>
													<Td>
														<Icon icon='HeroXMark' color='red' />
													</Td>
													<Td>-</Td>
												</Tr>
												<Tr>
													<Td>rounded</Td>
													<Td>
														<code>TRounded</code>
													</Td>
													<Td className='italic text-zinc-500'>
														'rounded-none' | 'rounded-sm' | 'rounded' |
														'rounded-md' | 'rounded-lg' | 'rounded-xl' |
														'rounded-2xl' | 'rounded-3xl' |
														'rounded-full'
													</Td>
													<Td>
														<Icon icon='HeroXMark' color='red' />
													</Td>
													<Td>
														<Tooltip text={themeConfig.rounded}>
															<code>themeConfig.rounded</code>
														</Tooltip>
													</Td>
												</Tr>
												<Tr>
													<Td>title</Td>
													<Td>
														<code>string</code>
													</Td>
													<Td className='italic text-zinc-500'>-</Td>
													<Td>
														<Icon icon='HeroXMark' color='red' />
													</Td>
													<Td>-</Td>
												</Tr>
												<Tr>
													<Td>variant</Td>
													<Td>
														<code>TAlertVariants</code>
													</Td>
													<Td className='italic text-zinc-500'>
														'solid' | 'outline' | 'default'
													</Td>
													<Td>
														<Icon icon='HeroXMark' color='red' />
													</Td>
													<Td>
														<code>'default'</code>
													</Td>
												</Tr>
											</TBody>
										</Table>
									</Visible>
									<Visible is={apiStatus}>
										<MdViewer mdFile={AlertInterfaceMd as RequestInfo} />
									</Visible>
								</CardBody>
							</Card>
						</div>
						<div
							id='borderWidth'
							ref={sectionRefs[2]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>borderWidth?: TBorderWidth;</code>
											<div className='text-xs'>{'<Alert />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='grid grid-cols-12 gap-4'>
										{arrBorderWidth.map((item) => (
											<div
												key={item}
												className='col-span-12 md:col-span-6 xl:col-span-4'>
												<Alert borderWidth={item} variant={previewVariant}>
													borderWidth: <b>{item}</b>, Lorem ipsum dolor
													sit amet.
												</Alert>
											</div>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
						<div
							id='color'
							ref={sectionRefs[3]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>color?: TColors;</code>
											<div className='text-xs'>{'<Alert />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='grid grid-cols-12 gap-4'>
										{arrColors.map((item) => (
											<div
												key={item}
												className='col-span-12 md:col-span-6 xl:col-span-4'>
												<Alert color={item} variant={previewVariant}>
													Color: <b>{item}</b>, Lorem ipsum dolor sit
													amet.
												</Alert>
											</div>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
						<div
							id='colorIntensity'
							ref={sectionRefs[4]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>colorIntensity?: TColorIntensity;</code>
											<div className='text-xs'>{'<Alert />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='grid grid-cols-12 gap-4'>
										{arrColorIntensity.map((item) => (
											<div
												key={item}
												className='col-span-12 md:col-span-6 xl:col-span-4'>
												<Alert
													colorIntensity={item}
													variant={previewVariant}>
													borderWidth: <b>{item}</b>, Lorem ipsum dolor
													sit amet.
												</Alert>
											</div>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
						<div
							id='icon'
							ref={sectionRefs[5]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>icon?: TIcons</code>
											<div className='text-xs'>{'<Alert />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='grid grid-cols-12 gap-4'>
										{[
											'HeroRocketLaunch',
											'HeroInformationCircle',
											'HeroBolt',
										].map((item) => (
											<div
												key={item}
												className='col-span-12 md:col-span-6 xl:col-span-4'>
												<Alert icon={item} variant={previewVariant}>
													icon: <b>{item}</b>, Lorem ipsum dolor sit amet.
												</Alert>
											</div>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
						<div
							id='iconSize'
							ref={sectionRefs[6]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>iconSize?: TFontSizes;</code>
											<div className='text-xs'>{'<Alert />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='grid grid-cols-12 gap-4'>
										{arrFontSizes.map((item) => (
											<div
												key={item}
												className='col-span-12 md:col-span-6 xl:col-span-4'>
												<Alert
													icon='HeroRocketLaunch'
													iconSize={item}
													variant={previewVariant}>
													iconSize: <b>{item}</b>, Lorem ipsum dolor sit
													amet.
												</Alert>
											</div>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
						<div
							id='isClosable'
							ref={sectionRefs[7]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>isClosable?: boolean;</code>
											<div className='text-xs'>{'<Alert />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='grid grid-cols-12 gap-4'>
										{[true, false].map((item) => (
											<div
												key={String(item)}
												className='col-span-12 md:col-span-6'>
												<Alert
													isClosable={item}
													icon='HeroRocketLaunch'
													variant={previewVariant}>
													isClosable: <b>{String(item)}</b>, Lorem ipsum
													dolor sit amet. Lorem ipsum dolor sit amet.
													Lorem ipsum dolor sit amet. Lorem ipsum dolor
													sit amet. Lorem ipsum dolor sit amet. Lorem
													ipsum dolor sit amet. Lorem ipsum dolor sit
													amet. Lorem ipsum dolor sit amet.
												</Alert>
											</div>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
						<div
							id='rounded'
							ref={sectionRefs[8]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>rounded?: TRounded;</code>
											<div className='text-xs'>{'<Alert />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='grid grid-cols-12 gap-4'>
										{arrRounded.map((item) => (
											<div
												key={String(item)}
												className='col-span-12 md:col-span-6'>
												<Alert
													icon='HeroRocketLaunch'
													rounded={item}
													variant={previewVariant}>
													isClosable: <b>{String(item)}</b>, Lorem ipsum
													dolor sit amet. Lorem ipsum dolor sit amet.
													Lorem ipsum dolor sit amet. Lorem ipsum dolor
													sit amet. Lorem ipsum dolor sit amet. Lorem
													ipsum dolor sit amet. Lorem ipsum dolor sit
													amet. Lorem ipsum dolor sit amet.
												</Alert>
											</div>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
						<div
							id='title'
							ref={sectionRefs[9]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>title?: string;</code>
											<div className='text-xs'>{'<Alert />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='grid grid-cols-12 gap-4'>
										<div className='col-span-12 md:col-span-6'>
											<Alert
												icon='HeroRocketLaunch'
												title='Title is here!'
												variant={previewVariant}>
												Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
												amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor
												sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
												dolor sit amet. Lorem ipsum dolor sit amet. Lorem
												ipsum dolor sit amet.
											</Alert>
										</div>
										<div className='col-span-12 md:col-span-6'>
											<Alert
												title='Title is here! (Without Icon)'
												variant={previewVariant}>
												Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
												amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor
												sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
												dolor sit amet. Lorem ipsum dolor sit amet. Lorem
												ipsum dolor sit amet.
											</Alert>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
						<div
							id='variant'
							ref={sectionRefs[10]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>variant?: TAlertVariants;</code>
											<div className='text-xs'>{'<Alert />'}</div>
										</CardTitle>
									</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='grid grid-cols-12 gap-4'>
										{['solid', 'outline', 'default'].map((item) => (
											<div
												key={item}
												className='col-span-12 md:col-span-6 xl:col-span-4'>
												<Alert variant={item as TAlertVariants}>
													Variant: <b>{item}</b>, Lorem ipsum dolor sit
													amet.
												</Alert>
											</div>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
					</DocContent>
					<DocNav>
						<Button isActive={activeSection === 0} className='!px-0'>
							<a href='#Examples'>Examples</a>
						</Button>
						<Button isActive={activeSection === 1} className='!px-0'>
							<a href='#Interface'>API</a>
						</Button>
						<code className='text-xs'>{'<Alert />'}</code>
						<Button isActive={activeSection === 2}>
							<a href='#borderWidth'>borderWidth</a>
						</Button>
						<Button isActive={activeSection === 3}>
							<a href='#color'>color</a>
						</Button>
						<Button isActive={activeSection === 4}>
							<a href='#colorIntensity'>colorIntensity</a>
						</Button>
						<Button isActive={activeSection === 5}>
							<a href='#icon'>icon</a>
						</Button>
						<Button isActive={activeSection === 6}>
							<a href='#iconSize'>iconSize</a>
						</Button>
						<Button isActive={activeSection === 7}>
							<a href='#isClosable'>isClosable</a>
						</Button>
						<Button isActive={activeSection === 8}>
							<a href='#rounded'>rounded</a>
						</Button>
						<Button isActive={activeSection === 9}>
							<a href='#title'>title</a>
						</Button>
						<Button isActive={activeSection === 10}>
							<a href='#variant'>variant</a>
						</Button>
					</DocNav>
				</Doc>
			</Container>
		</PageWrapper>
	);
};

export default AlertPage;
