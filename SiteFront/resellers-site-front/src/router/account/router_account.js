import Plain from '../../views/common/Plain'
import Add from '../../views/account/Add'
import Detail from '../../views/account/Detail'
import DetailUser from '../../views/account/DetailUser'
import DetailUserDevice from '../../views/account/DetailUserDevice'
import List from '../../views/account/List'

export default [
    {
        path: '/account',
        component: Plain,
        children: [
            {
                path: 'add',
                component: Add,
                name: 'account_add',
            },
            {
                path: 'detail/:userId',
                component: Detail,
                name: 'account_detail',
            },
            {
                path: 'detail_user',
                component: DetailUser,
                name: 'account_detail_user',
            },
            {
                path: 'detail_user_device',
                component: DetailUserDevice,
                name: 'account_detail_user_device',
            },
            {
                path: '',
                component: List,
                name: 'account_list',
            },
        ]
    },
]