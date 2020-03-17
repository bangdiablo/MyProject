import CloudDrive from '../../views/cloud_drive/cloud_drive.vue'
import PageNotFound from "../../views/common/PageNotFound"
import InternalServerError from "../../views/common/InternalServerError"

export default [
    {
        name: 'pageNotFound',
        path: '/pageNotFound',
        component: PageNotFound
    },
    {
        name: 'internalServerError',
        path: '/internalServerError',
        component: InternalServerError
    },
    {
        path: '*',
        redirect: PageNotFound
    }
]
