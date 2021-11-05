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
        @request="requestService"
        @rowclick="rowClicked"
        @addrow="addRow"
        @deleterows="deleteRows"
        @refetch="refetch"
        :selected.sync="selected"
        selection="multiple"
      >
<!--        <template v-slot:top-left>-->
<!--          <dictionary-select/>-->
<!--        </template>-->

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
import DataTableMixin from '../mixins/DataTable'

export default {
  name: 'AppServiceIndex',
  mixins: [DataTableMixin],
  components: {
    PageContainer,
    FormPageTitle,
    DataTable
    // DictionarySelect
  },
  data () {
    return {
      columns: [
        {
          name: 'code',
          label: this.$t('pages.dictionary.service.field.code.label'),
          field: 'code',
          sortable: true,
          align: 'left'
        },
        {
          name: 'description',
          label: this.$t('pages.dictionary.service.field.description.label'),
          field: 'description',
          align: 'left',
          sortable: true
        },
        {
          name: 'service_type',
          label: this.$t('pages.dictionary.service.field.service_type.label'),
          field: 'service_type',
          align: 'left',
          sortable: true
        },
        {
          name: 'unit_of_measure',
          label: this.$t('pages.dictionary.service.field.unit_of_measure.label'),
          field: 'unit_of_measure',
          align: 'left',
          sortable: true
        },
        {
          name: 'unit_price',
          label: this.$t('pages.dictionary.service.field.unit_price.label'),
          field: 'unit_price',
          align: 'left',
          sortable: true
        },
        {
          name: 'price_date',
          label: this.$t('pages.dictionary.service.field.price_date.label'),
          field: 'price_date',
          align: 'left',
          sortable: true
        }
      ]
    }
  },
  methods: {
    ...mapActions('measure', ['fetchService', 'deleteService']),
    refetch () {
      this.selected = []
      this.requestService(this.defaultPagination)
    },
    async requestService (props) {
      this.loading = true
      this.serverPagination = props.pagination

      const query = this.defaultQuery(props)

      const response = await this.fetchService(query)
      setTimeout(() => {
        const data = handleResponse(response)
        this.serverPagination.rowsNumber = data.count
        this.serverData = data.data
        this.loading = false
      }, 500)
    },
    deleteRows () {
      this.deleteService(this.selected)
      this.refetch()
    }
  }

}
</script>

<style scoped>

</style>
