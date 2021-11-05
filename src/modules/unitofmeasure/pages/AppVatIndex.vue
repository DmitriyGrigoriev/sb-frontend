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
        @request="requestVat"
        @rowclick="rowClicked"
        @addrow="addRow"
        @deleterows="deleteRows"
        @refetch="refetch"
        :selected.sync="selected"
        selection="multiple"
      >
<!--        :title="$t('pages.dictionary.vat.title')"-->

        <template v-slot:body-cell-vatextempt="props">
          <q-td :props="props">
            <checkbox-input
              :disable="true"
              :label="options.status.find(option => option.value === props.row.vatextempt).label"
              v-model="props.row.vatextempt"
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
/* eslint-disable camelcase */
import { mapActions } from 'vuex'
import PageContainer from '@/ui/page/PageContainer.vue'
import FormPageTitle from '../components/AppFormPageTitle'
import DictionarySelect from '../components/DictionarySelect'
import DataTable from '../components/DataTable'
import { handleResponse } from '@/utils'
import { CheckboxInput } from '@/ui'
import DataTableMixin from '../mixins/DataTable'

export default {
  name: 'AppVatIndex',
  mixins: [DataTableMixin],
  components: {
    CheckboxInput,
    DictionarySelect,
    DataTable,
    PageContainer,
    FormPageTitle
  },
  data () {
    return {
      columns: [
        {
          name: 'code',
          label: this.$t('pages.dictionary.vat.field.code.label'),
          field: 'code',
          sortable: true,
          align: 'center'
        },
        {
          name: 'vat',
          label: this.$t('pages.dictionary.vat.field.vat.label'),
          field: 'vat',
          align: 'center',
          sortable: true
        },
        {
          name: 'description',
          label: this.$t('pages.dictionary.vat.field.description.label'),
          field: 'description',
          align: 'left',
          sortable: true
        },
        {
          name: 'vatextempt',
          label: this.$t('pages.dictionary.vat.field.vatextempt.label'),
          field: 'vatextempt',
          align: 'left',
          sortable: true
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
    ...mapActions('measure', ['fetchVat']),
    refetch () {
      this.requestVat(this.defaultPagination)
    },
    async requestVat (props) {
      this.loading = true
      this.serverPagination = props.pagination

      const query = this.defaultQuery(props)

      const response = await this.fetchVat(query)
      setTimeout(() => {
        const data = handleResponse(response)
        this.serverPagination.rowsNumber = data.count
        this.serverData = data.data
        this.loading = false
      }, 500)
    },
    deleteRows () {
      this.deleteVat(this.selected)
      this.refetch()
    }
  }
}
</script>

<style scoped>

</style>
