import { mapGetters } from 'vuex'
const DataTableMixin = {
  data () {
    return {
      loading: false,
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
    ...mapGetters('measure', ['routeOption']),
    defaultPagination () {
      return {
        pagination: this.serverPagination,
        filter: ''
      }
    }
  },
  methods: {
    defaultQuery (props) {
      const query = {
        page: props.pagination.page,
        rows_per_page: props.pagination.rowsPerPage,
        search: props.filter
      }
      return query
    },
    getRouteName (routeType) {
      switch (routeType) {
        case 'add':
          return this.routeOption.router[0].add.name
        case 'edit':
          return this.routeOption.router[0].edit.name
        case 'delete':
          return this.routeOption.router[0].delete.name
      }
    },
    addRow () {
      this.$router.push(this.getRouteName('add'))
    },
    rowClicked (evt, row) {
      this.$router.push({ path: `${this.getRouteName('edit')}/${row.id}` })
      // this.$router.push({ path: `edit-measure/${row.id}` })
    }
  },
  created () {
    // if (Object.prototype.hasOwnProperty.call(this, 'add-row')) {
    //   this.$bus.$on('add-row', (event) => {
    //     this.addRow()
    //   })
    // }
    // if (Object.prototype.hasOwnProperty.call(this, 'delete-row')) {
    //   this.$bus.$on('delete-row', (event) => {
    //     this.delete()
    //   })
    // }
    if (Object.prototype.hasOwnProperty.call(this, 'refetch')) {
      this.$bus.$on('refetch', (event) => {
        this.refetch()
      })
      this.refetch({
        pagination: this.serverPagination
      })
    }
  }
}
export default DataTableMixin
