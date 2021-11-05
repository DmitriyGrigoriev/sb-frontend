// import dictionaryOptions from '../functions/dictionary'
export function SET_SELECTED (state, value) {
  state.routeName = value
}

export function SET_DICTIONARY (state) {
  state.defaultOption = state.routeName
  if (this.$router.currentRoute.name !== state.defaultOption) {
    this.$router.push(state.defaultOption)
  }
}

// export function SET_MODE (state, value) {
//   state.mode = value
// }

// export function SET_DICTIONARY (state) {
//   state.defaultOption = dictionaryOptions.getItem({ name: state.routeName })
//   if (this.$router.currentRoute.name !== state.defaultOption.router[0].list.name) {
//     this.$router.push(state.defaultOption.router[0].list)
//   }
// }
