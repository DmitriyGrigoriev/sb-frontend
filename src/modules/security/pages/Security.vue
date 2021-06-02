<template>
  <page-container>
    <template v-slot:title>
      <page-title :title="$t('menus.security.label')" icon="fas fa-fingerprint"></page-title>
    </template>

    <update-password></update-password>

    <q-separator></q-separator>

    <verify-email></verify-email>

    <q-separator></q-separator>

    <revoke-tokens></revoke-tokens>
  </page-container>
</template>

<script>
import PageContainer from '@/ui/page/PageContainer'
import PageTitle from '@/ui/page/PageTitle'
import UpdatePassword from '../components/UpdatePassword'
import VerifyEmail from '../components/VerifyEmail'
import RevokeTokens from '../components/RevokeTokens'

export default {
  components: {
    PageContainer,
    PageTitle,
    UpdatePassword,
    VerifyEmail,
    RevokeTokens
  },
  name: 'SecurityPage'
}
</script>
