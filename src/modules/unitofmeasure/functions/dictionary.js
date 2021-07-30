const dictionaryOptions = {
}
dictionaryOptions.getItem = function (item) {
  const defaultItem = {
    name: item.name,
    router: [
      {
        list: { name: `${item.name}` },
        add: { name: `add-${item.name}` },
        edit: { name: `edit-${item.name}` },
        delete: { name: `delete-${item.name}` }
      }
    ]
  }
  return defaultItem
}

export default dictionaryOptions
