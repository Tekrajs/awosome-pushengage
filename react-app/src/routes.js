import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Logout from "./components/auth/logout";
import BlogList from "./components/blogs/bloglist";
import Blog from "./components/blogs/detail";
import Subscription from "./components/pages/subscription";

const routes = [
    { path: '/', component: <BlogList />, is_public: true },
    { path: '/subscription', component: <Subscription />, is_public: true },
    { path: '/blog/:slug', component: <Blog /> },
    { path: '/register', component: <Register /> },
    { path: '/login', component: <Login /> },
    { path: '/logout', component: <Logout /> }
];

export default routes;