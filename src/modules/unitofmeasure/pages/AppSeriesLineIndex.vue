<template>
  <page-container>
    <template v-slot:title>
      <form-page-title/>
    </template>

    <div class="q-pa-md">
      <data-table
        :data="serverData"
        :columns="columns"
        :loading="loading"
        :pagination.sync="serverPagination"
        @request="requestSeriesLine"
        @rowclick="rowSeriesClicked"
        @addrow="addRow"
        @deleterows="deleteRows"
        @refetch="refetch"
        :selected.sync="selected"
        selection="multiple"
        :addButtonDisable="seriesBlocked"
      >

        <template v-slot:top-left>
          <dictionary-select/>
        </template>

      </data-table>
    </div>

    <blocked-series-banner
      @showblocked="fetchBlocked"
    >
    </blocked-series-banner>

  </page-container>

</template>

<script>
import { BLOCKED_SERIES } from '@/constants/dictionary'
import { mapActions } from 'vuex'
import { handleResponse } from '@/utils'
import PageContainer from '@/ui/page/PageContainer'
import FormPageTitle from '../components/AppFormPageTitle'
import DataTable from '../components/DataTable'
import DictionarySelect from '../components/DictionarySelect'
import DataTableMixin from '../mixins/DataTable'
import BlockedSeriesBanner from '../components/BlockedSeriesBanner'

export default {
  name: 'AppSeriesLineIndex',
  mixins: [DataTableMixin],
  components: {
    BlockedSeriesBanner,
    PageContainer,
    FormPageTitle,
    DataTable,
    DictionarySelect
  },
  data () {
    return {
      columns: [
        {
          name: 'series_no',
          label: this.$t('pages.dictionary.noseriesline.field.series_no.label'),
          field: 'series_no',
          sortable: true,
          align: 'left'
        },
        {
          name: 'starting_date',
          label: this.$t('pages.dictionary.noseriesline.field.starting_date.label'),
          field: 'starting_date',
          align: 'left',
          sortable: true
        },
        {
          name: 'starting_no',
          label: this.$t('pages.dictionary.noseriesline.field.starting_no.label'),
          field: 'starting_no',
          align: 'left',
          sortable: true
        },
        {
          name: 'ending_no',
          label: this.$t('pages.dictionary.noseriesline.field.ending_no.label'),
          field: 'ending_no',
          align: 'left',
          sortable: true
        },
        {
          name: 'last_date_used',
          label: this.$t('pages.dictionary.noseriesline.field.last_date_used.label'),
          field: 'last_date_used',
          align: 'left',
          sortable: true
        }
      ],
      seriesBlocked: false
    }
  },
  methods: {
    ...mapActions('measure', ['fetchSeriesLine', 'deleteSeriesLine']),
    refetch () {
      this.selected = []
      this.requestSeriesLine(this.defaultPagination)
    },
    async requestSeriesLine (props) {
      this.loading = true
      this.serverPagination = props.pagination

      const query = this.defaultQuery(props)
      query[`${BLOCKED_SERIES}`] = this.seriesBlocked

      const response = await this.fetchSeriesLine(query)
      setTimeout(() => {
        const data = handleResponse(response)
        this.serverPagination.rowsNumber = data.count
        this.serverData = data.data
        this.loading = false
      }, 500)
    },
    rowSeriesClicked (evt, row) {
      if (this.seriesBlocked) {
        this.$router.push({
          path: `${`edit-${this.$route.meta.indexPage}`}/${row.id}/blocked`
        })
      } else {
        this.rowClicked(evt, row)
      }
    },
    fetchBlocked (blocked) {
      this.seriesBlocked = blocked
      this.refetch()
    },
    deleteRows () {
      this.loading = true
      this.selected[`${BLOCKED_SERIES}`] = this.seriesBlocked
      this.deleteSeriesLine(this.selected)
      this.refetch()
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
