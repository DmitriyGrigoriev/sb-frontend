import { translate } from '@/utils/translate'
// Attempt to define `$t` in this context
const $t = translate

export const MEASURE_COLUMNS = [
  {
    name: 'code',
    label: $t('pages.dictionary.measure.field.code.label'),
    field: 'code',
    sortable: true,
    align: 'center'
  },
  {
    name: 'okei_code',
    label: $t('pages.dictionary.measure.field.okei_code.label'),
    field: 'okei_code',
    align: 'center',
    sortable: true
  },
  {
    name: 'description',
    label: $t('pages.dictionary.measure.field.description.label'),
    field: 'description',
    align: 'left',
    sortable: true
  }
]
