import React from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import Container from '../../components/layouts/Container/Container';
import ChatContainerCommon from './_common/ChatContainer.common';
import ChatInputContainerCommon from './_common/ChatInputContainer.common';
import Button from '../../components/ui/Button';
import Input from '../../components/form/Input';
import FieldWrap from '../../components/form/FieldWrap';
import ChatItemContainerCommon from './_common/ChatItemContainer.common';
import usersDb, { TUser } from '../../mocks/db/users.db';

const ChatPage = () => {
	const { id } = useParams();

	const currentUserData: TUser = usersDb.find((key) => key.username === id) as TUser;
	const defaultUser: TUser = usersDb[5];

	const chats: {
		[key: string]: {
			userName: string;
			userImage: string | undefined;
			isAnswer: boolean;
			text: string;
		}[];
	} = {
		sophiejones: [
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Hi ${defaultUser.firstName}, how are you?`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Hi ${currentUserData.firstName}, I'm good, thanks. How are you?`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `I'm good too, thank you. I wanted to share a few updates about my meeting with XYZ Company yesterday. We sent our initial proposal and are waiting for feedback. However, they might ask for some flexibility on the pricing.`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `I see. Have you done any preliminary work on which items we can be flexible with in the proposal?`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Yes, I have. We can offer some flexibility particularly on software licensing and training services. However, there’s not much room to maneuver on the hardware costs.`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Okay, that makes sense. Who are you dealing with on the customer side? Who is the decision-maker?`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `The main contact is Mr. ${usersDb[7].firstName}, the IT Manager. However, the final decision will be made by Mr. ${usersDb[4].firstName}, the Finance Director.`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Got it. It’s important to maintain a good relationship with Mrs. ${usersDb[7].firstName}. Also, could you prepare a presentation highlighting the cost benefits for Mr. ${usersDb[4].firstName}?`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Of course, I'll start working on it right away. I'll have it ready by tomorrow and send you a copy.`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Great. Also, if possible, let’s include a reference letter from a similar industry client. It could be very effective.`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Understood, I'll handle that immediately. Thanks, ${defaultUser.firstName}.`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `You're welcome, ${currentUserData.firstName}. Good luck. Let me know if you need anything else.`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Thanks, will do. Have a good day.`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `You too.`,
			},
		],
		johndoe: [
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Hello ${defaultUser.firstName}, are you ready for the client meeting?`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Hello! Yes, I'm ready. I've reviewed our presentation one last time and I'm prepared for any questions.`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Great! Remember to focus on the advantages of our product to grab the clients' attention.`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Understood, I'll emphasize the features of our product and demonstrate how we can provide solutions to their needs.`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Exactly! Also, don't forget to discuss pricing and post-sales support.`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Of course, I'll address those topics in detail as well. Shall we quickly review before the meeting starts?`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Certainly, let's go through it quickly now. Is there anything you need clarification on or want to add?`,
			},
		],
		aulistiainen: [
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Hi ${defaultUser.firstName}, how's everything going with the new project?`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Hey ${currentUserData.firstName}! It's going well so far. We've completed the initial planning phase and are moving into development.`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `That's good to hear! Do you foresee any challenges coming up?`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Well, we might need to adjust the timeline slightly. Some of the technical requirements are more complex than initially anticipated.`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `I see. Have you discussed this with the team? Maybe we can allocate more resources to speed up the process.`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Yes, I've brought it up in our last team meeting. We're exploring options to streamline the development without compromising quality.`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Great. Let's keep communication open and ensure we're all on the same page. Is there anything specific you need help with?`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Thanks, Sarah. I'll keep you updated if there are any major changes. For now, I think we're on track with our milestones.`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Perfect. Just let me know if there's anything I can do to support you. We're here to make sure this project is a success.`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Will do. Thanks for your support, Sarah.`,
			},
		],
		juliusmolesen: [
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Hi ${defaultUser.firstName}, I wanted to touch base about the upcoming client presentation`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Hi ${currentUserData.firstName}! Sure, what's on your mind?`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `I think we should revise the slide deck to focus more on the client's specific pain points and how our solution addresses them.`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `That sounds like a good approach. Should we schedule a brainstorming session with the team to gather ideas?`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Yes, I think that would be beneficial. I'll send out a meeting invite for tomorrow afternoon.`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Sounds good. Also, do we have all the updated data and case studies ready to include?`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `I've gathered most of it, but I'll double-check and make sure everything is current.`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Perfect. Let's aim to have a draft ready by end of day tomorrow so we can review it together before the presentation.`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Agreed. I'll coordinate with the design team to ensure the slides are visually engaging as well.`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Great, thanks Mark. I appreciate your proactive approach to this.`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `No problem, ${defaultUser.firstName}. Looking forward to collaborating on this to make sure we knock it out of the park for the client.`,
			},
		],
		jakecorbin: [
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Hey ${defaultUser.firstName}, have you had a chance to review the proposal draft I sent yesterday?`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Hi ${currentUserData.firstName}! Yes, I went through it. Overall, it looks good, but I have a few suggestions for improvement`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Sure, I'm all ears. What do you think needs tweaking?`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Firstly, I think we should emphasize our unique selling points more clearly in the executive summary. It'll help grab their attention right from the start.`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Good point. I'll rework that section to highlight our strengths more effectively.`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Also, I noticed a couple of minor inconsistencies in the financial projections. Let's ensure the numbers are accurate before finalizing.`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Absolutely, I'll review those numbers closely and make the necessary adjustments.`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Great. Once these updates are done, I think we'll be ready to send it out for client review. Do you agree?`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `Yes, I agree. Let's aim to finalize everything by end of day tomorrow so we can get their feedback early next week.`,
			},
			{
				userName: defaultUser.username,
				userImage: defaultUser.image?.thumb,
				isAnswer: false,
				text: `Sounds like a plan. Thanks for being on top of this, ${currentUserData.firstName}. I appreciate your responsiveness.`,
			},
			{
				userName: currentUserData.username,
				userImage: currentUserData.image?.thumb,
				isAnswer: true,
				text: `No problem, ${defaultUser.firstName}. Teamwork makes the dream work, right?`,
			},
		],
	};

	const activeChat = chats[currentUserData.username];

	const formik = useFormik({
		onSubmit(): void | Promise<never> {
			return undefined;
		},
		initialValues: {
			textField: '',
		},
	});

	return (
		<PageWrapper>
			<Container className='flex shrink-0 grow basis-auto flex-col pb-0'>
				<ChatContainerCommon>
					{activeChat.map((item) => (
						// eslint-disable-next-line react/jsx-props-no-spreading
						<ChatItemContainerCommon key={item.text} {...item}>
							{item.text}
						</ChatItemContainerCommon>
					))}
				</ChatContainerCommon>
				<ChatInputContainerCommon>
					<FieldWrap
						firstSuffix={
							<Button
								icon='HeroPlus'
								variant={formik.values.textField ? 'default' : 'solid'}
								rounded='rounded'
								className='me-2'
								aria-label='Upload file'
							/>
						}
						lastSuffix={
							formik.values.textField ? (
								<Button
									className='ms-2'
									variant='solid'
									rounded='rounded'
									icon='HeroPaperAirplane'>
									Send
								</Button>
							) : (
								<Button
									className='ms-2'
									icon='HeroMicrophone'
									aria-label='Speaking'
								/>
							)
						}>
						<Input
							id='textField'
							name='textField'
							dimension='xl'
							placeholder='Ask something'
							onChange={formik.handleChange}
							value={formik.values.textField}
						/>
					</FieldWrap>
				</ChatInputContainerCommon>
			</Container>
		</PageWrapper>
	);
};

export default ChatPage;
