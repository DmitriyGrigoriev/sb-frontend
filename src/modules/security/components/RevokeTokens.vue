<template>
  <div class="row q-pa-sm q-col-gutter-lg">
    <div class="col-lg-4 col-md-6 col-xs-12">
      <span class="text-subtitle1 text-primary">{{ $t('components.revoke_tokens.text.title') }}</span>
      <div class="text-caption">
        {{ $t('components.revoke_tokens.text.subtitle') }}
      </div>
    </div>

    <div class="col-lg-8 col-md-6 col-xs-12">
      <q-btn
        :label="$t('components.revoke_tokens.buttons.logout.label')"
        @click="confirmRevokeAllTokens"
        color="negative"
        outline
      ></q-btn>
    </div>
  </div>
</template>

<script>
import { storageService } from '@/services/storage.service'
import { handleError } from '@/utils'

export default {
  name: 'RevokeTokens',
  methods: {
    confirmRevokeAllTokens () {
      this.$q
        .dialog({
          title: this.$t('components.revoke_tokens.dialog.title'),
          message: this.$t('components.revoke_tokens.dialog.message'),
          cancel: true,
          transitionShow: 'fadeIn',
          transitionHide: 'fadeOut'
        })
        .onOk(() => this.revokeAllTokens())
    },
    revokeAllTokens () {
      // remove token
      try {
        storageService.removeToken()
        storageService.removeRefreshToken()
        storageService.clear()
        this.$router.replace('/login')
      } catch (error) {
        handleError(error)
      }
    }
  }
}
</script>

<style scoped>
button.q-btn {
  width: 150px;
}
</style>
