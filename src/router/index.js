import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../components/Home.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/LoginComponent.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../components/admin/DashboardComponent.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../components/admin/ProfileComponent.vue')
    },
    {
        path: '/edit-profile',
        name: 'EditProfile',
        component: () => import('../components/admin/EditProfileComponent.vue'),
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('../components/admin/SettingsComponent.vue'),
    },
    {
        path: '/select-appointment-type',
        name: 'AppointmentTypeSelector',
        component: () => import('../components/admin/AppointmentTypeSelector.vue'),
    },
    {
        path: '/commercial-appointments',
        name: 'CommercialAppointments',
        component: () => import('../components/admin/CommercialAppointments.vue'),
    },
    {
        path: '/residential-appointments',
        name: 'ResidentialAppointments',
        component: () => import('../components/admin/ResidentialAppointments.vue'),
    },
    {
        path: '/book-appointment',
        name: 'BookAppointment',
        component: () => import('../components/AppointmentComponent.vue'),
    },
    {
        path: '/commercial-cleaning',
        name: 'CommercialCleaning',
        component: () => import('../components/CommercialCleaningComponent.vue'),
    },
    {
        path: '/residential-cleaning',
        name: 'ResidentialCleaning',
        component: () => import('../components/ResidentialCleaningComponent.vue'),
    },
    {
        path: '/appointment-confirmation/:id',
        name: 'Confirmation',
        component: () => import('../components/BookingConfirmationComponent.vue'),
        props: true,
    },
    {
        path: '/residential-appointment-view/:id',
        name: 'ResidentialAppointmentView',
        component: () => import('../components/ResidentialAppointmentView.vue'),
        props: true,
    },
    {
        path: '/commercial-appointment-view/:id',
        name: 'CommercialAppointmentView',
        component: () => import('../components/CommercialAppointmentView.vue'),
        props: true,
    },
    {
        path: '/residential-appointment-detail/:id',
        name: 'ResidentialAppointmentDetail',
        component: () => import('../components/admin/ResidentialAppointmentDetail.vue'),
        props: true,
    },
    {
        path: '/commercial-appointment-detail/:id',
        name: 'CommercialAppointmentDetail',
        component: () => import('../components/admin/CommercialAppointmentDetail.vue'),
        props: true,
    },
    {
        path: '/admins-staff',
        name: 'AdminStaffList',
        component: () => import('../components/admin/AdminStaffList.vue'),
    },
    {
        path: '/staff/:id',
        name: 'StaffProfile',
        component: () => import('../components/admin/StaffProfile.vue'),
        props: true,
    },

    {
        path: '/reset-password',
        name: 'reset-password',
        component: () => import('../components/ResetPasswordForm.vue')
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () => import('../components/ForgotPasswordComponent.vue')
    },


];



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = [
        '/login', '/', '/book-appointment', '/commercial-cleaning', '/residential-cleaning', '/reset-password', '/forgot-password',
        /^\/appointment-confirmation\/.+/,
        /^\/residential-appointment-view\/.+/,
        /^\/commercial-appointment-view\/.+/,
    ]; // Define public routes that don't require authentication
    // const authRequired = !publicPages.includes(to.path);
    const authRequired = publicPages.some(pattern => {
        if (typeof pattern === 'string') {
            return to.path === pattern;
        } else if (pattern instanceof RegExp) {
            return pattern.test(to.path);
        }
        return false;
    });
    const loggedIn = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    // Redirect to login page if trying to access a restricted page and not logged in
    if (!authRequired && !loggedIn) {
        next('/login');
    } else if (to.path.startsWith('/staff/') && userRole !== 'Admin' && userRole !== 'SubAdmin') { 
        next('/dashboard');
    }
    else if (to.path.startsWith('/settings') && userRole !== 'Admin' && userRole !== 'SubAdmin') { 
        next('/dashboard');
    } else {
        next();
    }
});

export default router;
