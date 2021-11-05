<template>
  <q-btn
    :label="$t('buttons.add.label')"
    icon="add"
    color="primary"
    @click="$emit('click')"
  >
  </q-btn>
</template>

<script>
export default {
  name: 'PlusButton'
}
</script>
