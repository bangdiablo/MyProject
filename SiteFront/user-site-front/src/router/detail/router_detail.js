import Share from '../../views/detail/share.vue'
import ColdStorage from '../../views/detail/cold_storage.vue'
import RecycleBin from '../../views/detail/recycle_bin.vue'

export default [
    {
        path: '/detail/share', component: Share
    },
    {
        path: '/detail/cold_storage', component: ColdStorage
    },
    {
        path: '/detail/recycle_bin', component: RecycleBin
    },


]
