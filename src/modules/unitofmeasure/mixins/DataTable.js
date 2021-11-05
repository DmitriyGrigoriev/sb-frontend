import { mapActions } from 'vuex'
const DataTableMixin = {
  data () {
    return {
      loading: false,
      dataError: false,
      dataErrorMessage: '',
      serverData: [],
      serverPagination: {
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 0
      },
      selected: [] // add this line
    }
  },
  computed: {
    defaultPagination () {
      return {
        pagination: this.serverPagination,
        filter: ''
      }
    }
  },
  methods: {
    ...mapActions('measure', ['setSelected']),
    defaultQuery (props) {
      const query = {
        page: props.pagination.page,
        rows_per_page: props.pagination.rowsPerPage,
        search: props.filter
      }
      return query
    },
    addRow () {
      this.$router.push(`add-${this.$route.meta.indexPage}`)
    },
    rowClicked (evt, row) {
      this.$router.push({
        path: `${`edit-${this.$route.meta.indexPage}`}/${row.id}`
      })
    }
  },
  created () {
    if (Object.prototype.hasOwnProperty.call(this, 'refetch')) {
      this.refetch({
        pagination: this.serverPagination
      })
    }
    this.setSelected(this.$route.name)
  }
}
export default DataTableMixin
