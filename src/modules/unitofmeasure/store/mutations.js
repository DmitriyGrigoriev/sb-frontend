import dictionaryOptions from '../functions/dictionary'

export function SET_SELECTED (state, value) {
  state.defaultRoute = value
}

export function SET_DICTIONARY (state) {
  state.defaultOption = dictionaryOptions.getItem({ name: state.defaultRoute })
  if (this.$router.currentRoute.name !== state.defaultOption.router[0].list.name) {
    this.$router.push(state.defaultOption.router[0].list)
  }
}
