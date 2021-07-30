<template id="data-table">
<!--https://stackoverflow.com/questions/59170520/prop-being-mutated-vuejs  -->
<!--https://quasar.dev/vue-components/table-->
<!--row-key="id" There's important for selected.sync -->
  <q-table
    :data="data"
    :columns="columns"
    :loading="loading"
    :title="title"
    row-key="id"
    wrap-cells
    separator="cell"
    :selection="selection"
    :selected.sync="selectedRows"
    :pagination.sync="paginationModel"
    :selected-rows-label="getSelectedString"
    :no-data-label="$t('table.props.no_data_available')"
    :rows-per-page-label="$t('table.props.rows_per_page')"
    :no-results-label="$t('table.props.no_filter_result')"
    @request="onPageChange"
    @row-click="onRowClick"
  >
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th v-if="selection=='multiple'" auto-width>
          <q-checkbox
            color="secondary"
            v-if="props.multipleSelect"
            v-model="props.selected"
          />
        </q-th>
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          <strong>{{ col.label }}</strong>
        </q-th>
      </q-tr>
    </template>

    <template v-slot:top-right="props">
      <search v-model="getFilter"></search>

      <icon-button icon="add" :tooltip="$t('buttons.addrow.tooltip')" @click="onAddClick" />
<!--      <icon-button icon="add" :tooltip="$t('buttons.addrow.tooltip')" @click="$bus.$emit('add-row')" />-->

      <icon-button icon="delete" color="red" :disabled="mayDelete" :tooltip="$t('buttons.deleterow.tooltip')" @click="deleteRows" />

      <icon-button icon="refresh" :tooltip="$t('pages.dictionary.measure.buttons.refresh.tooltip')" @click="$bus.$emit('refetch')" />

      <fullscreen-button @click="props.toggleFullscreen" :in-fullscreen="props.inFullscreen"></fullscreen-button>

    </template>

    <!--https://forum.quasar-framework.org/topic/7677/qtable-with-custom-actions-passed-from-parent/3  -->
    <template
      v-for="(_, slot) of $scopedSlots"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>

  </q-table>
</template>

<script>
/* eslint-disable camelcase */
import { FullscreenButton, Search, IconButton } from '@/ui'
/* eslint no-dupe-keys: 0 */

export default {
  name: 'DataTable',
  components: {
    FullscreenButton,
    IconButton,
    Search
  },
  computed: {
    mayDelete () {
      return this.selected.length === 0
    },
    getFilter: {
      get: function () {
        return this.filter
      },
      set: function (val) {
        // @request -> function(requestProp) see quasar documentation
        this.$emit('request', { pagination: this.$props.pagination, filter: val })
      }
    },
    selectedRows: {
      get: function () {
        return this.selected
      },
      set: function (val) {
        this.$emit('update:selected', val)
      }
    },
    paginationModel: {
      get: function () {
        return this.pagination
      },
      set: function (val) {
        this.$emit('update:pagination', val)
      }
    }
  },
  methods: {
    onPageChange: function (val) {
      this.$emit('request', { pagination: val.pagination, filter: val.filter })
    },
    onRowClick (evt, row) {
      this.$emit('rowclick', evt, row)
    },
    onAddClick (evt, row) {
      this.$emit('addrow')
    },
    deleteRows () {
      this.$q
        .dialog({
          title: this.$t('pages.dictionary.measure.dialogues.confirm_delete.title'),
          message: this.$t('pages.dictionary.measure.dialogues.confirm_delete.message'),
          cancel: {
            label: this.$t('pages.dictionary.measure.dialogues.confirm_delete.buttons.cancel')
          },
          ok: {
            label: this.$t('pages.dictionary.measure.dialogues.confirm_delete.buttons.ok')
          }
        })
        .onOk(() => {
          this.$q.loading.show()
          this.$emit('deleterows')
          // this.$bus.$emit('delete-row')
        })
    },
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    }
  },
  props: {
    data: {
      required: true,
      default: () => []
    },
    columns: {
      required: true,
      default: () => []
    },
    selection: {
      default: 'none'
    },
    pagination: {
      required: true,
      default: () => {}
    },
    title: String,
    loading: Boolean,
    selected: Array
  }
}

</script>

<style scoped>

</style>
