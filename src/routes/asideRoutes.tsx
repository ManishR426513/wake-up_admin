import React from 'react';
import { RouteProps } from 'react-router-dom';
import DefaultAsideTemplate from '../templates/layouts/Asides/DefaultAside.template';
import { appPages, authPages } from '../config/pages.config';
import MailAsideTemplate from '../templates/layouts/Asides/MailAside.template';

const asideRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: null },
	{
		path: `${appPages.mailAppPages.to}/*`,
		element: <MailAsideTemplate />,
	},
	{ path: '*', element: <DefaultAsideTemplate /> },
];

export default asideRoutes;
