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
        someFunctionParent="someFunction"
        @request="requestUnitOfMeasure"
        @rowclick="rowClicked"
        @addrow="addRow"
        @deleterows="deleteRows"
        @refetch="refetch"
        :selected.sync="selected"
        selection="multiple"
      >
<!--        :title="$t('pages.dictionary.measure.title')"-->
        <template v-slot:top-left>
          <dictionary-select/>
        </template>

      </data-table>
    </div>

  </page-container>
</template>

<script>
/* eslint-disable camelcase */
import { mapActions } from 'vuex'
import { handleResponse } from '@/utils'
import PageContainer from '@/ui/page/PageContainer'
import FormPageTitle from '../components/AppFormPageTitle'
import DataTable from '../components/DataTable'
import DictionarySelect from '../components/DictionarySelect'
import DataTableMixin from '../mixins/DataTable'

export default {
  name: 'UnitOfMeasureIndex',
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
      ]
    }
  },
  methods: {
    ...mapActions('measure', ['fetchMeasure', 'deleteMeasure']),
    refetch () {
      this.selected = []
      this.requestUnitOfMeasure(this.defaultPagination)
    },
    async requestUnitOfMeasure (props) {
      this.loading = true
      this.serverPagination = props.pagination

      const query = this.defaultQuery(props)

      const response = await this.fetchMeasure(query)
      setTimeout(() => {
        const data = handleResponse(response)
        this.serverPagination.rowsNumber = data.count
        this.serverData = data.data
        this.loading = false
      }, 500)
    },
    deleteRows () {
      for (const payload of this.selected) {
        this.$store.dispatch('measure/deleteMeasure', payload)
          .then((res) => {
          // call mixin method
          })
          .catch((error) => {
            if (error.response.status === 550) {
              this.$bus.$emit('table-error', error)
            }
          })
      }
    }
  }
}

</script>

<style scoped>
</style>
