import account_setting from '../../views/header/account_setting.vue'
import inquiry from '../../views/header/inquiry.vue'
import problem_reporting from '../../views/header/problem_reporting.vue'

export default [
  {
    path: '/account_setting',   // 계정설정
    component: account_setting
  },
  {
    path: '/inquiry',           // 문의
    component: inquiry
  },
  {
    path: '/problem_reporting', // 문제 보고
    component: problem_reporting
  },
]