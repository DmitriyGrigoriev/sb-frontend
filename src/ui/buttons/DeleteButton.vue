<template>
  <q-btn
    flat
    round
    icon="delete"
    color="negative"
    :disabled="disabled"
    @click.stop="$emit('click')"
  >
    <q-tooltip>{{ $t('buttons.delete.tooltip') }}</q-tooltip>
  </q-btn>
</template>

<script>
export default {
  name: 'DeleteButton',
  props: ['disabled']
}
</script>
