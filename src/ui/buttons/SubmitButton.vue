<template id="submit-button">
  <q-btn
   :label="label"
   type="submit"
   name="submit-button"
   color="primary"
  />
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
