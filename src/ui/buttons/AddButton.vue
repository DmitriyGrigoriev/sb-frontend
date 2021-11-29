<template>
  <q-btn
    label="Добавить"
    color="primary"
    to="/projects/add"
    v-if="isEncoder"
  ></q-btn>
</template>

<script>
export default {
  name: 'AddButton'
}
</script>
