<template>
  <div class="column q-pa-sm">
    <div class="row text-caption text-weight-bold items-center justify-between">
      {{ label }}
    </div>
    <div class="row text-body2">
      <div class="col">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WithText',
  props: ['label']
}
</script>
