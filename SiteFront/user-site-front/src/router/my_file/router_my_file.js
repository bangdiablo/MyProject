// category

import Category from '../../views/my_file/category.vue'
import Size from '../../views/my_file/size.vue'
import ChangeDay from '../../views/my_file/change_day.vue'
import StorageKind from '../../views/my_file/storage_kind.vue'
import Owner from '../../views/my_file/owner.vue'

export default [
    {
        path: '/my_file/category', component: Category
    },
    {
        path: '/my_file/owner', component: Owner
    },
    {
        path: '/my_file/size', component: Size
    },
    {
        path: '/my_file/change_day', component: ChangeDay
    },
    {
        path: '/my_file/storage_kind', component: StorageKind
    }


]
