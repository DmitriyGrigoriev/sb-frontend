<template id="reset-button">
  <q-btn
    name="reset-button"
    :label="label"
    outline
    color="primary"
  />
<!--  @click="listeners['click']"-->
</template>
<script>
export default {
  name: 'ResetButton',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
