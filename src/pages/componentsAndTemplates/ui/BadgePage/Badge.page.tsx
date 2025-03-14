import React, { useRef, useState } from 'react';
import useScrollSpy from 'react-use-scrollspy';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import Container from '../../../../components/layouts/Container/Container';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import MdViewer from '../../../../components/MdViewer';
import BadgeInterfaceMD from './md/BadgeInterface.md';
import { arrBorderWidth } from '../../../../types/borderWidth.type';
import Badge, { TBadgeVariants } from '../../../../components/ui/Badge';
import { arrColors } from '../../../../types/colors.type';
import ButtonGroup from '../../../../components/ui/ButtonGroup';
import { arrColorIntensity } from '../../../../types/colorIntensities.type';
import { arrRounded } from '../../../../types/rounded.type';
import Doc, { DocContent, DocNav } from '../../../../templates/for-demo/Doc';
import ExampleView from '../../../../templates/for-demo/ExampleView';
import BadgeExample1MD from './md/BadgeExample1.md';
import Subheader, { SubheaderLeft } from '../../../../components/layouts/Subheader/Subheader';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';

const BadgePage = () => {
	const sectionRefs = [
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

	const [previewVariant, setPreviewVariant] = useState<TBadgeVariants>('solid');
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
	return (
		<PageWrapper name='Badge'>
			<Subheader>
				<SubheaderLeft>
					<Breadcrumb path='Components & Templates / UI' currentPage='Badge' />
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
						<div className='col-span-12 md:col-span-12'>
							<ExampleView title='Example 1' mdFile={BadgeExample1MD as RequestInfo}>
								<Card>
									<CardBody>
										Lorem ipsum dolor sit amet, <Badge>consectetur</Badge>{' '}
										adipiscing elit. Integer lacinia enim vitae venenatis
										blandit. Ut porttitor in{' '}
										<Badge variant='outline'>tellus vel</Badge> pretium. Proin
										id pulvinar mauris. Morbi euismod id nibh vitae tempus. Sed
										a molestie lectus. Nulla dignissim{' '}
										<Badge className='border-transparent' variant='outline'>
											urna sit amet
										</Badge>{' '}
										tempor consectetur. Nam placerat enim sed sem{' '}
										<Badge variant='solid'>porta</Badge>,{' '}
										<Badge variant='solid' color='emerald'>
											vitae
										</Badge>{' '}
										aliquam quam eleifend. Phasellus scelerisque sem nunc, id
										luctus lorem cursus vel.
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
										<CardTitle>Interface</CardTitle>
									</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<MdViewer mdFile={BadgeInterfaceMD as RequestInfo} />
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
											<div className='text-xs'>{'<Badge />'}</div>
										</CardTitle>
									</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='flex flex-wrap items-center gap-4'>
										{arrBorderWidth.map((item) => (
											<div key={item}>
												<Badge borderWidth={item} variant='outline'>
													{item}
												</Badge>
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
											<div className='text-xs'>{'<Badge />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='flex flex-wrap items-center gap-4'>
										{arrColors.map((item) => (
											<div key={item}>
												<Badge color={item} variant={previewVariant}>
													{item}
												</Badge>
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
											<div className='text-xs'>{'<Badge />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='flex flex-wrap gap-4'>
										{arrColors.map((color) => (
											<div
												key={color}
												className='flex flex-wrap items-center gap-4'>
												{arrColorIntensity.map((item) => (
													<div key={item}>
														<Badge
															color={color}
															colorIntensity={item}
															variant={previewVariant}>
															{color}-{item}
														</Badge>
													</div>
												))}
											</div>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
						<div
							id='rounded'
							ref={sectionRefs[5]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>rounded?: TRounded;</code>
											<div className='text-xs'>{'<Badge />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='flex flex-wrap items-center gap-4'>
										{arrRounded.map((item) => (
											<div key={item}>
												<Badge rounded={item} variant={previewVariant}>
													{item}
												</Badge>
											</div>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
						<div
							id='variant'
							ref={sectionRefs[6]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>variant?: TButtonVariants;</code>
											<div className='text-xs'>{'<Badge />'}</div>
										</CardTitle>
									</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='flex flex-wrap items-center gap-4'>
										{['solid', 'outline', 'default'].map((item) => (
											<div key={item}>
												<Badge variant={item as TBadgeVariants}>
													Variant: {item}
												</Badge>
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
							<a href='#Interface'>Interface</a>
						</Button>
						<code className='text-xs'>{'<Badge />'}</code>
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
							<a href='#rounded'>rounded</a>
						</Button>
						<Button isActive={activeSection === 6}>
							<a href='#variant'>variant</a>
						</Button>
					</DocNav>
				</Doc>
			</Container>
		</PageWrapper>
	);
};

export default BadgePage;
