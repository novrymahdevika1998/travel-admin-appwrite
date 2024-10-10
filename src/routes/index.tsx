import {
    createBrowserRouter,
} from 'react-router-dom';
import Pet from '../pages/Pet';
import SearchParams from '../pages/SearchParams';
import Component from '../pages/Component';
import DashboardLayout from '../layouts/DashboardLayout';
import Form from '../pages/Form';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                path: '/search',
                element: <SearchParams />,
            },
            {
                path: '/component',
                element: <Component />,
            },
            {
                path: '/form',
                element: <Form />,
            }
        ]
    },
])

export { router }