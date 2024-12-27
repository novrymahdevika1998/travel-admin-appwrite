import {
    createBrowserRouter,
    Navigate,
    useLocation,
} from 'react-router-dom';
import Pet from '../pages/Pet';
import SearchParams from '../pages/SearchParams';
import Component from '../pages/Component';
import DashboardLayout from '../layouts/DashboardLayout';
import Form from '../pages/Form';
import Counter from '@/pages/Counter';
import GuestGuard from '@/guards/GuestGuard';
import AuthGuard from '@/guards/AuthGuard';
import { ElementType, lazy, Suspense } from 'react';
import { useAuth } from '@/lib/context/JWTContext';

const Loadable = (Component: ElementType) => (props: any) => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    )

}

const Login = Loadable(lazy(() => import('@/pages/Login')))
const JamaahCreate = Loadable(lazy(() => import('@/pages/JamaahCreate')))
const Upload = Loadable(lazy(() => import('@/sections/Upload')))

const router = createBrowserRouter([
    {
        path: '/login',
        element:
            <GuestGuard>
                <Login />
            </GuestGuard>
        ,
    },
    {
        path: '/admin',
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
])

export { router }