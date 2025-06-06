import React, { useRef } from 'react';
import useScrollSpy from 'react-use-scrollspy';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../../../components/layouts/Subheader/Subheader';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import Button from '../../../../components/ui/Button';
import Container from '../../../../components/layouts/Container/Container';
import Doc, { DocContent, DocNav } from '../../../../templates/for-demo/Doc';
import ExampleView from '../../../../templates/for-demo/ExampleView';
import Card, { CardBody } from '../../../../components/ui/Card';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import ReactToastifyExample1 from './_partial/ReactToastifyExample1';
import ReactToastifyExample2 from './_partial/ReactToastifyExample2';
import ReactToastifyExample1MD from './md/ReactToastifyExample1.md';
import ReactToastifyExample2MD from './md/ReactToastifyExample2.md';

const ReactToastifyPage = () => {
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
	];
	const activeSection = useScrollSpy({
		sectionElementRefs: sectionRefs,
		offsetPx: -90,
	});

	return (
		<PageWrapper name='React Toastify'>
			<Subheader>
				<SubheaderLeft>
					<Breadcrumb
						path='Components & Templates / Integrated'
						currentPage='React Toastify'
					/>
				</SubheaderLeft>
				<SubheaderRight>
					<Button
						icon='CustomNpm'
						onClick={() => {
							window.open('https://www.npmjs.com/package/react-toastify', '_blank');
						}}>
						react-toastify
					</Button>
					<Button
						icon='CustomGithub'
						onClick={() => {
							window.open(
								'https://github.com/fkhadra/react-toastify?tab=readme-ov-file',
								'_blank',
							);
						}}>
						react-toastify
					</Button>
				</SubheaderRight>
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
						<div className='col-span-6'>
							<ExampleView
								title='Example 1'
								mdFile={ReactToastifyExample1MD as RequestInfo}>
								<Card>
									<CardBody>
										<ReactToastifyExample1 />
									</CardBody>
								</Card>
							</ExampleView>
						</div>
						<div className='col-span-6'>
							<ExampleView
								title='Example 2'
								mdFile={ReactToastifyExample2MD as RequestInfo}>
								<Card>
									<CardBody>
										<ReactToastifyExample2 />
									</CardBody>
								</Card>
							</ExampleView>
						</div>
					</DocContent>
					<DocNav>
						<Button isActive={activeSection === 0} className='!px-0'>
							<a href='#Examples'>Examples</a>
						</Button>
					</DocNav>
				</Doc>
			</Container>
		</PageWrapper>
	);
};

export default ReactToastifyPage;
