<template>
  <page-container>
    <template v-slot:title>
      <page-title :title="$t('pages.dictionary.title')" icon="fas fa-snowflake"></page-title>
    </template>
    <div class="q-pa-md">
      <q-table
        :data="serverData"
        :columns="columns"
        :loading="loading"
        :pagination.sync="serverPagination"
        :filter="filter"
        row-key="code"
        @request="requestUnitOfMeasure"
        @row-click="rowClicked"
        wrap-cells
        separator="cell"
        :selected.sync="selected"
        selection="multiple"
        :selected-rows-label="getSelectedString"
        :title="$t('pages.dictionary.measure.title')"
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

          <icon-button icon="add" :tooltip="$t('buttons.addrow.tooltip')" @click="addUnitRow" />

          <icon-button icon="delete" color="red" :disabled="mayDelete" :tooltip="$t('buttons.deleterow.tooltip')" @click="deleteUnitRow" />

          <icon-button icon="refresh" :tooltip="$t('pages.dictionary.measure.buttons.refresh.tooltip')" @click="refetch" />

          <fullscreen-button @click="props.toggleFullscreen" :in-fullscreen="props.inFullscreen"></fullscreen-button>

        </template>

      </q-table>
    </div>

  </page-container>
</template>

<script>
/* eslint-disable camelcase */
import { mapGetters, mapActions } from 'vuex'
import {
  FullscreenButton,
  Search
} from '@/ui'
import PageContainer from '@/ui/page/PageContainer.vue'
import PageTitle from '@/ui/page/PageTitle.vue'
import IconButton from '@/ui/buttons/IconButton'
// import HelpButton from '@/ui/buttons/HelpButton'
// import { openURL } from 'quasar'
import { handleError, handleResponse } from '@/utils'

export default {
  name: 'UnitOfMeasureIndex',
  components: {
    // HelpButton,
    IconButton,
    Search,
    FullscreenButton,
    PageContainer,
    PageTitle
  },
  computed: {
    ...mapGetters('auth', ['isEncoder']),
    mayDelete () {
      return this.selected.length === 0
    }
  },
  data () {
    return {
      filter: '',
      loading: false,
      selected: [],
      columns: [
        {
          name: 'code',
          label: this.$t('pages.dictionary.measure.field.code.label'),
          field: 'code',
          sortable: true,
          align: 'center'
        },
        {
          name: 'okei_code',
          label: this.$t('pages.dictionary.measure.field.okei_code.label'),
          field: 'okei_code',
          align: 'center',
          sortable: true
        },
        {
          name: 'description',
          label: this.$t('pages.dictionary.measure.field.description.label'),
          field: 'description',
          align: 'left',
          sortable: true
        }
      ],
      serverData: [],
      serverPagination: {
        page: 1,
        rowsNumber: 0, // specifying this determines pagination is server-side
        rowsPerPage: 5, // current rows per page being displayed
        descending: true
      }
    }
  },
  methods: {
    ...mapActions('measure', ['fetchMeasure', 'deleteMeasure']),
    refetch () {
      this.requestUnitOfMeasure({
        pagination: this.serverPagination
      })
    },
    async requestUnitOfMeasure (props) {
      this.loading = true
      this.serverPagination = props.pagination
      const query = {
        page: props.pagination.page,
        rows_per_page: props.pagination.rowsPerPage,
        search: this.filter
      }
      const response = await this.fetchMeasure(query)
      setTimeout(() => {
        const data = handleResponse(response)
        this.serverPagination.rowsNumber = data.count
        this.serverData = data.data
        this.loading = false
      }, 500)
    },
    addUnitRow () {
      this.$router.push({ name: 'add-measure' })
    },
    rowClicked (evt, row) {
      this.$router.push({ path: `edit-measure/${row.id}` })
    },
    deleteUnitRow () {
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
          this.deleteMeasure(this.selected)
            .then(() => {
              this.clearSelected()
              this.refetch()
            })
            .catch(error => {
              handleError(error)
            })
            .finally(() => this.$q.loading.hide())
        })
    },
    clearSelected () {
      this.selected = []
    },
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.serverData.length}`
    },
    showHelp () {
      const content = this.$t('pages.dictionary.measure.help')
      this.$q.dialog({
        title: this.$t('pages.dictionary.measure.title'),
        message: content,
        html: true,
        cancel: true
      })
    }
  },
  created () {
    this.refetch()
  }
}
</script>

<style scoped>

</style>
