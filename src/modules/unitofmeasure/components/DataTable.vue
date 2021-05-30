<template id="data-table">
  <q-table
    :data="table_data"
    :columns="columns"
    :loading="loading"
    :filter="filter"
    :title="title"
    :pagination.sync="pagination"
    row-key="name"
    @request="$emit('request')"
    @row-click="$emit('row-clicked')"
    wrap-cells
    separator="cell"
    selection="multiple"
    :selected.sync="selected_prop"
    :selected-rows-label="getSelectedString"
    :no-data-label="$t('table.props.no_data_available')"
    :rows-per-page-label="$t('table.props.rows_per_page')"
    :no-results-label="$t('table.props.no_filter_result')"
    style="margin-bottom: 70px;"
  >
    <template v-slot:header-cell="props">
      <q-th :props="props">
        <strong>{{ props.col.label }}</strong>
      </q-th>
    </template>

    <template v-slot:top-right="props">
      <search v-model="filter"></search>

      <icon-button icon="add" :tooltip="$t('buttons.addrow.tooltip')" @click="$emit('add-row')" />

<!--      <icon-button icon="delete" color="red" :disabled="mayDelete" :tooltip="$t('buttons.deleterow.tooltip')" @click="$emit('delete-row')" />-->

      <icon-button icon="refresh" :tooltip="$t('pages.dictionary.measure.buttons.refresh.tooltip')" @click="$emit('refetch')" />

      <fullscreen-button @click="props.toggleFullscreen" :in-fullscreen="props.inFullscreen"></fullscreen-button>

    </template>

  </q-table>
</template>

<script>
/* eslint-disable camelcase */
import { FullscreenButton, Search } from '@/ui'
import IconButton from '@/ui/buttons/IconButton'

export default {
  name: 'DataTable',
  props: {
    title: String,
    loading: Boolean,
    selection: String,
    filter: String,
    data: Array,
    selected: Array,
    columns: Array
  },
  components: {
    IconButton,
    Search,
    FullscreenButton
  },
  watch: {
    selected_prop: function () {
      this.$emit('select', this.selected_prop)
    }
  },
  data () {
    return {
      selection_prop: '',
      selected_prop: [],
      table_data: [],
      serverPagination: {
        page: 1,
        rowsNumber: 0, // specifying this determines pagination is server-side
        rowsPerPage: 5, // current rows per page being displayed
        descending: true
      },
      pagination: {
        page: 1,
        rowsNumber: 0, // specifying this determines pagination is server-side
        rowsPerPage: 5, // current rows per page being displayed
        descending: true
      }
    }
  },
  computed: {
    // mayDelete () {
    //   return this.selected.length === 0
    // }
  },
  methods: {
    clearSelected () {
      this.selected = []
    },
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.serverData.length}`
    }
  },
  created () {
    if (this.selected === undefined) {
      this.selected_prop = []
    } else {
      this.selected_prop = this.selected
    }
  }
}

</script>

<style scoped>

</style>
