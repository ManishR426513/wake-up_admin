import React, { Fragment, useRef, useState } from 'react';
import useScrollSpy from 'react-use-scrollspy';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import Container from '../../../../components/layouts/Container/Container';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../components/ui/Card';
import MdViewer from '../../../../components/MdViewer';
import ButtonInterfaceMd from './md/ButtonInterface.md';
import Button, { TButtonSize, TButtonVariants } from '../../../../components/ui/Button';
import ButtonGroup from '../../../../components/ui/ButtonGroup';
import { arrBorderWidth } from '../../../../types/borderWidth.type';
import { arrColors } from '../../../../types/colors.type';
import { arrColorIntensity } from '../../../../types/colorIntensities.type';
import { TIcons } from '../../../../types/icons.type';
import { arrRounded } from '../../../../types/rounded.type';
import Doc, { DocContent, DocNav } from '../../../../templates/for-demo/Doc';
import ExampleView from '../../../../templates/for-demo/ExampleView';
import ButtonExample1MD from './md/ButtonExample1.md';
import ButtonExample2MD from './md/ButtonExample2.md';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/ui/Dropdown';
import Subheader, { SubheaderLeft } from '../../../../components/layouts/Subheader/Subheader';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';

type TStatusValue = 'Copy' | 'Copying' | 'Copied';
type TStatus = { [key in 'COPY' | 'COPYING' | 'COPIED']: TStatusValue };

const STATUS: TStatus = {
	COPY: 'Copy',
	COPYING: 'Copying',
	COPIED: 'Copied',
};

const ButtonPage = () => {
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
		useRef(null),
		useRef(null),
	];
	const activeSection = useScrollSpy({
		sectionElementRefs: sectionRefs,
		offsetPx: -90,
	});

	const [previewVariant, setPreviewVariant] = useState<TButtonVariants>('solid');
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

	const [state, setState] = useState<TStatusValue>(STATUS.COPY);
	const onCopy = () => {
		setState(STATUS.COPYING);
		setTimeout(() => setState(STATUS.COPIED), 3000);
	};

	return (
		<PageWrapper name='Button'>
			<Subheader>
				<SubheaderLeft>
					<Breadcrumb path='Components & Templates / UI' currentPage='Button' />
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
							<ExampleView title='Example 1' mdFile={ButtonExample1MD as RequestInfo}>
								<Card>
									<CardBody>
										<Button
											icon={
												state === STATUS.COPIED
													? 'HeroClipboardDocumentCheck'
													: 'HeroClipboardDocumentList'
											}
											variant={state === STATUS.COPIED ? 'solid' : 'outline'}
											color={state === STATUS.COPIED ? 'emerald' : 'blue'}
											isLoading={state === STATUS.COPYING}
											onClick={() => onCopy()}>
											{state}
										</Button>
									</CardBody>
								</Card>
							</ExampleView>
						</div>
						<div className='col-span-12 md:col-span-6'>
							<ExampleView title='Example 2' mdFile={ButtonExample2MD as RequestInfo}>
								<Card>
									<CardFooter>
										<CardFooterChild>
											<Button color='red' icon='HeroArrowLeft'>
												Back
											</Button>
										</CardFooterChild>
										<CardFooterChild>
											<Button
												variant='outline'
												color='zinc'
												icon='HeroXCircle'>
												Cancel
											</Button>
											<Button variant='solid' icon='HeroPencil'>
												Save
											</Button>
											<Dropdown>
												<DropdownToggle hasIcon={false}>
													<Button
														variant='solid'
														icon='HeroEllipsisVertical'
													/>
												</DropdownToggle>
												<DropdownMenu placement='bottom-end'>
													<DropdownItem>Item 1</DropdownItem>
													<DropdownItem>Item 2</DropdownItem>
													<DropdownItem>Item 3</DropdownItem>
												</DropdownMenu>
											</Dropdown>
										</CardFooterChild>
									</CardFooter>
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
									<MdViewer mdFile={ButtonInterfaceMd as RequestInfo} />
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
											<div className='text-xs'>{'<Button />'}</div>
										</CardTitle>
									</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='flex flex-wrap items-center gap-4'>
										{arrBorderWidth.map((item) => (
											<div key={item}>
												<Button borderWidth={item} variant='outline'>
													{item}
												</Button>
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
											<div className='text-xs'>{'<Button />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='flex flex-wrap items-center gap-4'>
										{arrColors.map((item) => (
											<div key={item}>
												<Button color={item} variant={previewVariant}>
													{item}
												</Button>
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
											<div className='text-xs'>{'<Button />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='flex flex-wrap items-center gap-4'>
										{arrColorIntensity.map((item) => (
											<div key={item}>
												<Button
													colorIntensity={item}
													variant={previewVariant}>
													{item}
												</Button>
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
											<code>icon?: TIcons;</code>
											<div className='text-xs'>{'<Button />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='flex flex-wrap items-center gap-4'>
										{[
											'HeroRocketLaunch',
											'HeroShoppingCart',
											'HeroExclamationTriangle',
										].map((item: TIcons) => (
											<Fragment key={item}>
												<div>
													<Button icon={item} variant={previewVariant}>
														{item}
													</Button>
												</div>
												<div>
													<Button icon={item} variant={previewVariant} />
												</div>
											</Fragment>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
						<div
							id='isActive'
							ref={sectionRefs[6]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>isActive?: boolean;</code>
											<div className='text-xs'>{'<Button />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='flex flex-wrap items-center gap-4'>
										{arrColors.map((color) => (
											<Fragment key={color}>
												{[true, false].map((item: boolean) => (
													<div key={`${color}-${String(item)}`}>
														<Button
															isActive={item}
															color={color}
															variant={previewVariant}>
															isActive: {String(item)}
														</Button>
													</div>
												))}
											</Fragment>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
						<div
							id='isDisable'
							ref={sectionRefs[7]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>isDisable?: boolean;</code>
											<div className='text-xs'>{'<Button />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='flex flex-wrap items-center gap-4'>
										{arrColors.map((color) => (
											<Fragment key={color}>
												{[true, false].map((item: boolean) => (
													<div key={`${color}-${String(item)}`}>
														<Button
															isDisable={item}
															color={color}
															variant={previewVariant}>
															isDisable: {String(item)}
														</Button>
													</div>
												))}
											</Fragment>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
						<div
							id='isLoading'
							ref={sectionRefs[8]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>isLoading?: boolean;</code>
											<div className='text-xs'>{'<Button />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='flex flex-wrap items-center gap-4'>
										{arrColors.map((color) => (
											<Fragment key={color}>
												{[true, false].map((item: boolean) => (
													<div key={`${color}-${String(item)}`}>
														<Button
															isLoading={item}
															color={color}
															variant={previewVariant}>
															isLoading: {String(item)}
														</Button>
													</div>
												))}
											</Fragment>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
						<div
							id='rightIcon'
							ref={sectionRefs[9]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>rightIcon?: TIcons;</code>
											<div className='text-xs'>{'<Button />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='flex flex-wrap items-center gap-4'>
										{[
											'HeroRocketLaunch',
											'HeroShoppingCart',
											'HeroExclamationTriangle',
										].map((item: TIcons) => (
											<div key={item}>
												<Button
													icon={item}
													rightIcon={item}
													variant={previewVariant}>
													{item}
												</Button>
											</div>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
						<div
							id='rounded'
							ref={sectionRefs[10]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>rounded?: TRounded;</code>
											<div className='text-xs'>{'<Button />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='flex flex-wrap items-center gap-4'>
										{arrRounded.map((item) => (
											<div key={item}>
												<Button rounded={item} variant={previewVariant}>
													{item}
												</Button>
											</div>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
						<div
							id='size'
							ref={sectionRefs[11]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>size?: TButtonSize;</code>
											<div className='text-xs'>{'<Button />'}</div>
										</CardTitle>
									</CardHeaderChild>
									<CardHeaderChild>{PreviewSettings}</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='flex flex-wrap items-center gap-4'>
										{['xs', 'sm', 'default', 'lg', 'xl'].map((item) => (
											<div key={item}>
												<Button
													size={item as TButtonSize}
													variant={previewVariant}>
													Size: {item}
												</Button>
											</div>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
						<div
							id='variant'
							ref={sectionRefs[12]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>variant?: TButtonVariants;</code>
											<div className='text-xs'>{'<Button />'}</div>
										</CardTitle>
									</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='flex flex-wrap items-center gap-4'>
										{['solid', 'outline', 'default'].map((item) => (
											<div key={item}>
												<Button variant={item as TButtonVariants}>
													Variant: {item}
												</Button>
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
						<code className='text-xs'>{'<Button />'}</code>
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
							<a href='#isActive'>isActive</a>
						</Button>
						<Button isActive={activeSection === 7}>
							<a href='#isDisable'>isDisable</a>
						</Button>
						<Button isActive={activeSection === 8}>
							<a href='#isLoading'>isLoading</a>
						</Button>
						<Button isActive={activeSection === 9}>
							<a href='#rightIcon'>rightIcon</a>
						</Button>
						<Button isActive={activeSection === 10}>
							<a href='#rounded'>rounded</a>
						</Button>
						<Button isActive={activeSection === 11}>
							<a href='#size'>size</a>
						</Button>
						<Button isActive={activeSection === 12}>
							<a href='#variant'>variant</a>
						</Button>
					</DocNav>
				</Doc>
			</Container>
		</PageWrapper>
	);
};

export default ButtonPage;
