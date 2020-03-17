import Plain from '../../views/common/Plain'
import List from '../../views/report/List'

export default [
    {
        path: '/report',
        component: Plain,
        children: [
            {
                path: '',
                component: List,
                name: 'report_list',
            }
        ]
    }
]