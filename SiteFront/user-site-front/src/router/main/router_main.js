import main from '../../views/main/main.vue'
import before_login from '../../views/before_login/Login.vue'
import find_password from '../../views/before_login/FindPassword.vue'
import resetPasswordForm from '../../views/before_login/ResetPasswordForm.vue'
import memberJoinForm from '../../views/before_login/MemberJoinForm.vue'

// const requireAuth = () => (from, to, next) => {
//
//     const isAuthenticated = false;
//
//     if (isAuthenticated) return next();
//
//     next('/login?returnPath=me');
// }

export default [

    {
        path: '/main',
        component: main
    }
]