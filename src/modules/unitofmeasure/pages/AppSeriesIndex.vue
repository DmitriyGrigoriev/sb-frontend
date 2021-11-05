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
        @request="requestSeries"
        @rowclick="rowClicked"
        @addrow="addRow"
        @deleterows="deleteRows"
        @refetch="refetch"
        :selected.sync="selected"
        selection="multiple"
      >
        <template v-slot:body-cell-date_order="props">
          <q-td :props="props">
            <checkbox-input
              :disable="true"
              :label="options.status.find(option => option.value === props.row.date_order).label"
              v-model="props.row.date_order"
            >
            </checkbox-input>
          </q-td>
        </template>

        <template v-slot:top-left>
          <dictionary-select/>
        </template>

      </data-table>
    </div>

  </page-container>
</template>

<script>
import { mapActions } from 'vuex'
import { handleResponse } from '@/utils'
import PageContainer from '@/ui/page/PageContainer'
import FormPageTitle from '../components/AppFormPageTitle'
import DataTable from '../components/DataTable'
import DictionarySelect from '../components/DictionarySelect'
import { CheckboxInput } from '@/ui'
import DataTableMixin from '../mixins/DataTable'

export default {
  name: 'AppSeriesIndex',
  mixins: [DataTableMixin],
  components: {
    CheckboxInput,
    PageContainer,
    FormPageTitle,
    DataTable,
    DictionarySelect
  },
  data () {
    return {
      columns: [
        {
          name: 'code',
          label: this.$t('pages.dictionary.noseries.field.code.label'),
          field: 'code',
          sortable: true,
          align: 'left'
        },
        {
          name: 'description',
          label: this.$t('pages.dictionary.noseries.field.description.label'),
          field: 'description',
          align: 'left',
          sortable: true
        },
        {
          name: 'date_order',
          label: this.$t('pages.dictionary.noseries.field.date_order.label'),
          field: 'date_order',
          align: 'left'
        }
      ],
      options: {
        status: [
          { label: 'Да', value: true, color: 'cyan-8' },
          { label: 'Нет', value: false, color: 'grey-7' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('measure', ['fetchSeries', 'deleteSeries']),
    refetch () {
      this.requestSeries(this.defaultPagination)
    },
    async requestSeries (props) {
      this.loading = true
      this.serverPagination = props.pagination

      const query = this.defaultQuery(props)

      const response = await this.fetchSeries(query)
      setTimeout(() => {
        const data = handleResponse(response)
        this.serverPagination.rowsNumber = data.count
        this.serverData = data.data
        this.loading = false
      }, 500)
    },
    deleteRows () {
      this.deleteSeries(this.selected)
      this.refetch()
    }
  }
}

</script>

<style scoped>
</style>
