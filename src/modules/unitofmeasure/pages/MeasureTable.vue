<template>
    <data-table
      ref="table"
      :columns="columns"
      :loading="loading"
      :filter="filter"
      :title="$t('pages.dictionary.measure.title')"
      row-key="code"
      @request="requestUnitOfMeasure"
      @row-click="rowClicked"
    >
    </data-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DataTable from '../components/DataTable'
import { handleError, handleResponse } from '@/utils'

export default {
  name: 'MeasureTable',
  components: { DataTable },
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
      server_data: [],
      pagination: {
        page: 1,
        rowsNumber: 0, // specifying this determines pagination is server-side
        rowsPerPage: 5, // current rows per page being displayed
        descending: true
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['isEncoder'])
    // mayDelete () {
    //   return this.selected.length === 0
    // }
  },
  methods: {
    ...mapActions('measure', ['fetchMeasure', 'deleteMeasure']),
    refetch () {
      this.requestUnitOfMeasure({
        pagination: this.pagination
      })
    },
    async requestUnitOfMeasure (props) {
      this.loading = true
      this.$refs.table.pagination = this.pagination
      const query = {
        page: this.pagination.page,
        rows_per_page: this.pagination.rowsPerPage,
        search: this.filter
      }
      const response = await this.fetchMeasure(query)
      setTimeout(() => {
        const data = handleResponse(response)
        this.$refs.table.pagination.rowsNumber = data.count
        this.$refs.table.table_data = data.data
        this.loading = false
      }, 500)
      // console.log('>>> server_data.lenght:', this.server_data.length)
    },
    addRow () {
      this.$router.push({ name: 'add-measure' })
    },
    rowClicked (evt, row) {
      this.$router.push({ path: `edit-measure/${row.id}` })
    },
    deleteRow () {
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
