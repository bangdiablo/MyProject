import Plain from '../../views/common/Plain'
import Add from '../../views/license/Add'
import Detail from '../../views/license/Detail'
import List from '../../views/license/List'

export default [
    {
        path: '/license',
        component: Plain,
        children: [
            {
                path: 'add',
                component: Add,
                name: 'license_add',
            },
            {
                path: 'detail/:licenseId',
                component: Detail,
                name: 'license_detail',
            },
            {
                path: '',
                component: List,
                name: 'license_list',
            },
        ]
    },
]