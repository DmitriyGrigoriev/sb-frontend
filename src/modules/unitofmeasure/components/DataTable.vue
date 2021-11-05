<template id="data-table">
<!--https://stackoverflow.com/questions/59170520/prop-being-mutated-vuejs  -->
<!--https://quasar.dev/vue-components/table-->
<!--row-key="id" There's important for selected.sync -->
  <div>
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
      @request="onPageChange"
      @row-click="onRowClick"
    >
      <!--    :selected-rows-label="getSelectedString"-->
      <!--    :no-data-label="$t('table.props.no_data_available')"-->
      <!--    :rows-per-page-label="$t('table.props.rows_per_page')"-->
      <!--    :no-results-label="$t('table.props.no_filter_result')"-->

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

        <icon-button icon="add" :disabled="addButtonDisable" :tooltip="$t('buttons.addrow.tooltip')" @click="onAddClick" />

        <icon-button icon="delete" color="red" :disabled="mayDelete" :tooltip="$t('buttons.deleterow.tooltip')" @click="deleteRows" />

        <icon-button icon="refresh" :tooltip="$t('pages.dictionary.measure.buttons.refresh.tooltip')" @click="onRefetch" />

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
    <q-banner
      inline-actions
      dense
      rounded
      class="bg-red text-white"
      v-if="error"
    >
      {{ errorMessage }}

    </q-banner>
  </div>
</template>

<script>
import { FullscreenButton, Search, IconButton } from '@/ui'

/* eslint-disable camelcase */
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
          title: this.$t('pages.dictionary.dialogues.confirm_delete.title'),
          message: this.$t('pages.dictionary.dialogues.confirm_delete.message'),
          cancel: {
            label: this.$t('pages.dictionary.dialogues.confirm_delete.buttons.cancel')
          },
          ok: {
            label: this.$t('pages.dictionary.dialogues.confirm_delete.buttons.ok')
          }
        })
        .onOk(() => {
          // this.$q.loading.show()
          this.$emit('deleterows')
        })
    },
    onRefetch () {
      this.clearTableError()
      this.$emit('refetch')
    },
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    dataTableError (error) {
      if (error.response.status === 550) {
        this.error = true
        this.errorMessage = error.response.data.detail
      }
    },
    clearTableError () {
      this.error = false
      this.errorMessage = ''
    }
  },
  mounted () {
    this.$bus.$on('table-error', (error) => {
      // we are waiting an event from deleteRows()
      this.dataTableError(error)
    })
    this.$bus.$on('clear-table-error', () => {
      // we are waiting an event from clearErrors()
      this.clearTableError()
    })
  },
  data () {
    return {
      error: false,
      errorMessage: ''
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
    addButtonDisable: {
      type: Boolean,
      default: false
    },
    title: String,
    loading: Boolean,
    selected: Array
  }
}

</script>

<style scoped>

</style>
