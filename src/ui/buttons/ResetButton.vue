<template id="reset-button">
  <q-btn
    type="reset"
    name="reset-button"
    :label="label"
    @click="$emit('click')"
    outline
    color="primary"
  />

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
