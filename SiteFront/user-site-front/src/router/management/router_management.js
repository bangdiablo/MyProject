// 유저/서버
import UserServer from '../../views/management/user_server/UserServer.vue'
import UserInfo from '../../views/management/user_server/UserInfo.vue'
import MailInvitation from '../../views/management/user_server/MailInvitation.vue'
import ManualInvitation from '../../views/management/user_server/ManualInvitation.vue'
import CsvInvitation from '../../views/management/user_server/CsvInvitation.vue'

// 정책
import Policy from '../../views/management/policy/policy.vue'
import RegistPolicy from '../../views/management/policy/regist_policy.vue'
import PolicyColdStorage from '../../components/management/policy/cold_storage_data.vue'
import PolicyOcrStorage from '../../components/management/policy/ocr_data.vue'
import PolicyExtension from '../../components/management/policy/extension.vue'
import PolicySetting from '../../components/management/policy/setting.vue'
import PolicyPermission from '../../components/management/policy/permission.vue'
import CreatePolicy from '../../views/management/policy/create_policy.vue'
// 설정
import Setting from '../../views/management/setting/setting.vue'
import SettingPossessDetail from '../../components/management/setting/PossessionDetailSetting.vue'
import SettingClientStorageWarning from '../../components/management/setting/ClientStorageWarringSetting.vue'


export default [
  {
    path: '/management/user_server', component: UserServer, props: true
  },
  {
    path: '/management/user_server/user_info/:userId', component: UserInfo, name: 'user_info'
  },
  {
    path: '/management/user_server/mail_invitation', component: MailInvitation
  },
  {
    path: '/management/user_server/manual_invitation', component: ManualInvitation
  },
  {
    path: '/management/user_server/csv_invitation', component: CsvInvitation
  },
  {
    path: '/management/policy', component: Policy
  },
  {
    path: '/management/regist_policy', component: RegistPolicy
  },
  {
    path: '/management/regist_policy/:bp_id?', component: RegistPolicy, name:'policy_edit',
  },
  {
    path: '/management/create_policy', component: CreatePolicy
  },
  {
    path: '/management/policy_cold_storage', component: PolicyColdStorage
  },
  {
    path: '/management/policy_ocr_storage', component: PolicyOcrStorage
  },
  {
    path: '/management/policy_extension', component: PolicyExtension
  },
  {
    path: '/management/policy_setting', component: PolicySetting
  },
  {
    path: '/management/policy_permission', component: PolicyPermission
  },
  {
    path: '/management/setting', component: Setting
  },
  {
    path: '/management/setting_possess_detail', component: SettingPossessDetail
  },
  {
    path: '/management/setting_client_storage_warning', component: SettingClientStorageWarning
  }
]
