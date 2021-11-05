<template>
  <page-container>
    <template v-slot:title>
      <app-form-page-title
        :showHelpButton="true"
      >
      </app-form-page-title>
    </template>

    <slot name="form"></slot>

  </page-container>
</template>

<script>
import PageContainer from '@/ui/page/PageContainer'
import AppFormPageTitle from './AppFormPageTitle'

export default {
  name: 'AppFormContainer',
  components: {
    PageContainer,
    AppFormPageTitle
  }
}
</script>

<style scoped>

</style>
