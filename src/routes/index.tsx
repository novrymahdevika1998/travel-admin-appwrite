import {
    createBrowserRouter,
} from 'react-router-dom';
import Pet from '../pages/Pet';
import SearchParams from '../pages/SearchParams';

const router = createBrowserRouter([
    {
        path: '/search',
        element: <SearchParams />,
    }
])

export { router }