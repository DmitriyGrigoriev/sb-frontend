<template>
  <page-container>
    <template v-slot:title>
      <page-title
        :title="$t('pages.dictionary.title')"
        icon="fas fa-snowflake"
      >
      </page-title>
    </template>

    <div class="q-pa-md">
      <data-table
        :data="serverData"
        :columns="columns"
        :loading="loading"
        :pagination.sync="serverPagination"
        @request="requestUnitOfMeasure"
        @rowclick="rowClicked"
        @addrow="addRow"
        @deleterows="deleteRows"
        :selected.sync="selected"
        selection="multiple"
      >
<!--        :title="$t('pages.dictionary.measure.title')"-->
        <template v-slot:top-left>
          <dictionary-select
            ref="selectDictionary"
          >
          </dictionary-select>
        </template>

      </data-table>
    </div>

  </page-container>
</template>

<script>
/* eslint-disable camelcase */
import { mapActions } from 'vuex'
import PageContainer from '@/ui/page/PageContainer.vue'
import PageTitle from '@/ui/page/PageTitle.vue'
import DataTable from '../components/DataTable'
import DictionarySelect from '../components/DictionarySelect'
import { handleError, handleResponse } from '@/utils'
import DataTableMixin from '../mixins/DataTable'

export default {
  name: 'UnitOfMeasureIndex',
  mixins: [DataTableMixin],
  components: {
    DataTable,
    DictionarySelect,
    PageContainer,
    PageTitle
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
  computed: {
  },
  methods: {
    ...mapActions('measure', ['fetchMeasure', 'deleteMeasure']),
    refetch () {
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
      this.deleteMeasure(this.selected)
        .then(() => {
          this.refetch()
        })
        .catch(error => {
          handleError(error)
        })
        .finally(() => this.$q.loading.hide())
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
  created () {}
}
</script>

<style scoped>
</style>
