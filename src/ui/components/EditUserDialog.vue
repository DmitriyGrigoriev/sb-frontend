<template id="edit-user-dialog">
  <div class="q-pa-md" style="max-width: 800px">
<!--  <div class="q-pa-md q-gutter-sm">-->
<!--    :content-css="{minWidth: '80vw', minHeight: '80vh'}"-->
    <dialog-container v-model="updateProfileDialog">
      <dialog-header
        :title="$t('shortcuts.labels.select_icon')"
        @close="updateProfileDialog = false"
      ></dialog-header>
      <q-form greedy @submit.prevent="handleFormSubmit" @reset="handleReset">
        <div class="column q-pa-sm">
          <div class="bg-red-1 q-mb-sm q-pa-sm" v-if="errors.length">
            Please check the following:
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </div>

          <text-input
            :label="$t('users.user.account')"
            v-model="name"
            :rules="[val => !!val || '* Required']"
          ></text-input>

<!--          <single-select-->
<!--            label="Office"-->
<!--            :options="operating_units"-->
<!--            v-model="operating_unit_id"-->
<!--            :rules="[val => !!val || '* Required']"-->
<!--          ></single-select>-->

<!--          <text-input-->
<!--            v-model="position"-->
<!--            label="Position/Designation"-->
<!--            :rules="[val => !!val || '* Required']"-->
<!--          />-->

<!--          <text-input-->
<!--            v-model="contact_number"-->
<!--            label="Contact No."-->
<!--            hint="Include area code"-->
<!--            :rules="[val => !!val || '* Required']"-->
<!--          />-->

          <q-card-actions align="right">
            <reset-button
              :label="$t('buttons.cancel')"
              @click="handleReset"
            >
            </reset-button>
            <submit-button
              :label="$t('buttons.save')"
              @click="handleFormSubmit"
            >
            </submit-button>
          </q-card-actions>
        </div>
      </q-form>
    </dialog-container>

    <q-dialog
      v-model="updateProfileDialog"
      full-height
      persistent
      :aria-disabled="false"
      :position="$q.screen.xs ? void 0 : 'right'"
      :maximized="$q.screen.xs"
      transition-show="jump-left"
      transition-hide="jump-right"
    >
<!--      <q-card :style="$q.screen.xs ? void 0 : 'width:400px'">-->
<!--        <q-toolbar>-->
<!--          <q-avatar>-->
<!--            <img src="icons/favicon-96x96.png">-->
<!--          </q-avatar>-->
<!--          <q-toolbar-title>-->
<!--            <span class="text-weight-bold">-->
<!--              {{ $t('menus.labels.select_icon') }}-->
<!--            </span>-->
<!--          </q-toolbar-title>-->
<!--        </q-toolbar>-->

<!--        <q-card-section>-->
<!--          <q-separator/>-->
<!--          <q-card-section class="row q-gutter-sm items-center">-->
<!--            <div class="q-px-sm q-py-xs text-white rounded-borders text-center text-no-wrap">-->
<!--              <q-input v-model="tempUser.name" :label="$t('users.user.account')" />-->
<!--              <q-input v-model="tempUser.trueName" :label="$t('users.user.name')" />-->
<!--              <q-input v-model="tempUser.email" :label="$t('users.user.email')" />-->
<!--              <q-input v-model="tempUser.phone" :label="$t('users.user.phone')" />-->
<!--            </div>-->
<!--          </q-card-section>-->
<!--          <div class="q-pa-md" >-->
<!--            <div class="row">-->
<!--              <div class="layout-padding">-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--        <q-card-actions>-->
<!--          <q-btn-->
<!--            color="primary"-->
<!--            @click="saveUser"-->
<!--          >-->
<!--            {{$t('buttons.save')}}-->
<!--          </q-btn>-->
<!--          <q-btn-->
<!--            color="red"-->
<!--            v-close-popup-->
<!--          >-->
<!--            {{$t('buttons.cancel')}}-->
<!--          </q-btn>-->
<!--        </q-card-actions>-->
<!--      </q-card>-->
    </q-dialog>
  </div>
</template>

<script>
import TextInput from '@/ui/form-inputs/TextInput'
import DialogHeader from '@/ui/dialogs/DialogHeader'
import DialogContainer from '@/ui/dialogs/DialogContainer'
import ResetButton from '@/ui/buttons/ResetButton'
import SubmitButton from '@/ui/buttons/SubmitButton'

export default {
  name: 'edit-user-dialog',
  components: {
    TextInput,
    DialogContainer,
    DialogHeader,
    ResetButton,
    SubmitButton
  },
  data () {
    return {
      updateProfileDialog: false,
      errors: [],
      name: null,
      tempUser: {
        id: 0,
        name: '',
        trueName: '',
        email: '',
        phone: ''
      }
    }
  },
  methods: {
    async handleFormSubmit () {
      // await saveUser(this.tempUser)
      this.$q.notify({
        type: 'positive',
        message: this.$t('Saved successfully'),
        position: 'bottom-right'
      })
      this.updateProfileDialog = false
      // this.search()
    },
    handleReset () {
      // this.name = null;
      // this.operating_unit_id = null;
      // this.position = null;
      // this.contact_number = null;
    }
    // search () {
    //   this.request({
    //     pagination: this.serverPagination,
    //     filter: this.filter
    //   })
    // },
  }
}
</script>

<style scoped>

</style>
