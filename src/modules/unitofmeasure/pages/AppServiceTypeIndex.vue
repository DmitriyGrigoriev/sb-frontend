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
        @request="requestServiceType"
        @rowclick="rowClicked"
        @addrow="addRow"
        @deleterows="deleteRows"
        @refetch="refetch"
        :selected.sync="selected"
        selection="multiple"
      >
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
import DataTableMixin from '../mixins/DataTable'

export default {
  name: 'AppServiceType',
  mixins: [DataTableMixin],
  components: {
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
          label: this.$t('pages.dictionary.servicetype.field.code.label'),
          field: 'code',
          sortable: true,
          align: 'left'
        },
        {
          name: 'description',
          label: this.$t('pages.dictionary.servicetype.field.description.label'),
          field: 'description',
          align: 'left',
          sortable: true
        }
      ]
    }
  },
  methods: {
    ...mapActions('measure', ['fetchServiceType', 'deleteServiceType']),
    refetch () {
      this.requestServiceType(this.defaultPagination)
    },
    async requestServiceType (props) {
      this.loading = true
      this.serverPagination = props.pagination

      const query = this.defaultQuery(props)

      const response = await this.fetchServiceType(query)
      setTimeout(() => {
        const data = handleResponse(response)
        this.serverPagination.rowsNumber = data.count
        this.serverData = data.data
        this.loading = false
      }, 500)
    },
    deleteRows () {
      this.deleteServiceType(this.selected)
      this.refetch()
    }
  }
}
</script>

<style scoped>

</style>
