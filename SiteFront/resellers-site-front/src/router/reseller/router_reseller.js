import Plain from '../../views/common/Plain'
import Add from "../../views/reseller/Add"
import Detail from "../../views/reseller/Detail"
import List from "../../views/reseller/List"

export default [
    {
        path: '/reseller',
        component: Plain,
        children: [
            {
                path: 'add',
                component: Add,
                name: 'reseller_add',
            },
            {
                path: 'detail/:licenseId',
                component: Detail,
                name: 'reseller_detail',
            },
            {
                path: '',
                component: List,
                name: 'reseller_list',
            },
        ]
    },
]