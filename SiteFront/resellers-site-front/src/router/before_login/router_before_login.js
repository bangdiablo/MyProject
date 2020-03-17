import Plain from '../../views/common/Plain'
import Login from '../../views/before_login/Login'
import FindPassword from '../../views/before_login/FindPassword'
import ResetPasswordForm from '../../views/before_login/ResetPasswordForm'

export default [
    {
        path: '/before_login/',
        component: Plain,
        children: [
            {
                path: 'login',
                component: Login,
                name: 'login'
            },
            {
                path: 'findPassword',
                component: FindPassword,
                name: 'findPassword'
            },
            {
                path: 'resetPasswordForm',
                component: ResetPasswordForm,
                name: 'resetPasswordForm'
            }
        ]
    }
]
