<template id="submit-button">
  <q-btn
   :label="label"
   @click="$emit('click')"
   name="submit-button"
   color="primary"
  />
<!--  type="submit"-->

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
