<template id="submit-button">
  <q-btn
   :label="label"
    name="submit-button"
    color="primary"
    outline
  />
<!--  @click="listeners['click']"-->
</template>
<script>
export default {
  name: 'SubmitButton',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
