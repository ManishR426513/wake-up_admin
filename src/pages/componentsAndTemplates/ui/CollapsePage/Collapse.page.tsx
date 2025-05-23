import React, { useRef, useState } from 'react';
import useScrollSpy from 'react-use-scrollspy';
import Subheader, { SubheaderLeft } from '../../../../components/layouts/Subheader/Subheader';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import Container from '../../../../components/layouts/Container/Container';
import Doc, { DocContent, DocNav } from '../../../../templates/for-demo/Doc';
import Collapse from '../../../../components/utils/Collapse';
import Button from '../../../../components/ui/Button';
import ExampleView from '../../../../templates/for-demo/ExampleView';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../components/ui/Card';
import MdViewer from '../../../../components/MdViewer';
import CollapseExample1Partial from './_partial/CollapseExample1.partial';
import CollapseExample2Partial from './_partial/CollapseExample2.partial';
import CollapseInterfaceMD from './md/CollapseInterface.md';
import CollapseExample1MD from './md/CollapseExample1.md';
import CollapseExample2MD from './md/CollapseExample2.md';
import Table, { TBody, Td, Th, THead, Tr } from '../../../../components/ui/Table';
import Icon from '../../../../components/icon/Icon';

const CollapsePage = () => {
	const sectionRefs = [useRef(null), useRef(null), useRef(null)];
	const activeSection = useScrollSpy({
		sectionElementRefs: sectionRefs,
		offsetPx: -90,
	});

	const [state, setState] = useState(false);

	return (
		<PageWrapper name='Collapse'>
			<Subheader>
				<SubheaderLeft>
					<Breadcrumb path='Components & Templates / UI' currentPage='Collapse' />
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
							<ExampleView
								title='Example 1'
								mdFile={CollapseExample1MD as RequestInfo}>
								<CollapseExample1Partial />
							</ExampleView>
						</div>
						<div className='col-span-12 md:col-span-6'>
							<ExampleView
								title='Example 2'
								mdFile={CollapseExample2MD as RequestInfo}>
								<CollapseExample2Partial />
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
									<MdViewer mdFile={CollapseInterfaceMD as RequestInfo} />
								</CardBody>
								<CardBody>
									<Table>
										<THead>
											<Tr>
												<Th align='left'>Prop</Th>
												<Th align='left'>Type</Th>
												<Th align='left'>Required</Th>
												<Th align='left'>Default</Th>
											</Tr>
										</THead>
										<TBody>
											<Tr>
												<Td>children</Td>
												<Td>
													<code>ReactNode</code>
												</Td>
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
												<Td>
													<Icon icon='HeroXMark' color='red' />
												</Td>
												<Td>-</Td>
											</Tr>
											<Tr>
												<Td>isOpen</Td>
												<Td>
													<code>boolean</code>
												</Td>
												<Td>
													<Icon icon='HeroXMark' color='red' />
												</Td>
												<Td>
													<code>false</code>
												</Td>
											</Tr>
										</TBody>
									</Table>
								</CardBody>
							</Card>
						</div>
						<div
							id='isOpen'
							ref={sectionRefs[2]}
							className='scroll-mt-offset col-span-12'>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle className='flex flex-col items-baseline'>
											<code>isOpen?: boolean;</code>
											<div className='text-xs'>{'<Collapse />'}</div>
										</CardTitle>
									</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='grid grid-cols-12 gap-4'>
										<div className='col-span-12 md:col-span-6'>
											<Card className='border-2 border-zinc-300/25 dark:border-zinc-800/50'>
												<CardHeader>
													<CardHeaderChild>
														<Button
															variant='solid'
															onClick={() => setState(true)}>
															<div className='flex gap-2'>
																<span>Set to</span> <b>true</b>
															</div>
														</Button>
														<Button
															variant='solid'
															onClick={() => setState(false)}>
															<div className='flex gap-2'>
																<span>Set to</span> <b>false</b>
															</div>
														</Button>
													</CardHeaderChild>
													<CardHeaderChild>
														<Button
															variant='outline'
															color={state ? 'emerald' : 'red'}
															isDisable>
															<div className='flex gap-2'>
																<span>status:</span>
																<b>{state.toString()}</b>
															</div>
														</Button>
													</CardHeaderChild>
												</CardHeader>
												<CardBody>
													<Collapse isOpen={state}>
														Mauris blandit urna eget nulla placerat, sed
														dictum augue hendrerit. Nam purus tellus,
														fermentum at hendrerit in, placerat at urna.
														Nunc id neque urna. Praesent tempor
														porttitor congue. Nullam scelerisque
														venenatis hendrerit. Morbi ullamcorper
														posuere ligula. Ut eu fermentum nunc, vel
														pharetra eros. Morbi elementum enim eu diam
														consectetur, vitae dictum eros convallis. Ut
														vehicula gravida massa sit amet faucibus.
														Orci varius natoque penatibus et magnis dis
														parturient montes, nascetur ridiculus mus.
														Integer fringilla, libero at ultrices
														suscipit, ex ligula pretium massa, ut
														euismod turpis ipsum a ex. Aenean sit amet
														nibh justo. Aenean finibus urna id erat
														pulvinar, nec mollis nulla dapibus. Vivamus
														non nisl lacinia, mollis urna ac, tempus
														magna.
													</Collapse>
												</CardBody>
											</Card>
										</div>
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
						<code className='text-xs'>{'<Collapse />'}</code>
						<Button isActive={activeSection === 2}>
							<a href='#isOpen'>isOpen</a>
						</Button>
					</DocNav>
				</Doc>
			</Container>
		</PageWrapper>
	);
};

export default CollapsePage;
