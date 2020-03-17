import Plain from '../../views/common/Plain'
import Add from "../../views/plan/Add"
import Detail from "../../views/plan/Detail"
import List from "../../views/plan/List"

export default [
    {
        path: '/plan',
        component: Plain,
        children: [
            {
                path: 'add',
                component: Add,
                name: 'plan_add',
            },
            {
                path: 'detail/:licenseId',
                component: Detail,
                name: 'plan_detail',
            },
            {
                path: '',
                component: List,
                name: 'plan_list',
            },
        ]
    },


]