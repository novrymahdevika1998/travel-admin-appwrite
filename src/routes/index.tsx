import {
    createBrowserRouter,
    Navigate,
} from 'react-router-dom';
import SearchParams from '../pages/SearchParams';
import Component from '../pages/Component';
import DashboardLayout from '../layouts/DashboardLayout';
import Form from '../pages/Form';
import Counter from '@/pages/Counter';
import GuestGuard from '@/guards/GuestGuard';
import AuthGuard from '@/guards/AuthGuard';
import { ElementType, lazy, Suspense } from 'react';
import Page404 from '@/pages/Page404';

const Loadable = (Component: ElementType) => () => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Component />
        </Suspense>
    )

}

const Login = Loadable(lazy(() => import('@/pages/Login')))
const JamaahCreate = Loadable(lazy(() => import('@/pages/JamaahCreate')))
const Upload = Loadable(lazy(() => import('@/sections/Upload')))

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to={'auth/login'} replace />,
        index: true
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                element:
                    <GuestGuard>
                        <Login />
                    </GuestGuard>
                ,
            }
        ]
    },
    {
        path: 'admin',
        element:
            <AuthGuard>
                <DashboardLayout />
            </AuthGuard>
        ,
        children: [
            { element: <Navigate to="jamaah" replace />, index: true },
            {
                path: 'jamaah',
                element: <Upload />,
            },
            {
                path: 'jamaah/create',
                element: <JamaahCreate />,
            },
            {
                path: 'search',
                element: <SearchParams />,
            },
            {
                path: 'component',
                element: <Component />,
            },
            {
                path: 'form',
                element: <Form />,
            },
            {
                path: 'counter',
                element: <Counter />,
            }
        ]
    },
    { path: '*', element: <Page404 /> }
])

export { router }