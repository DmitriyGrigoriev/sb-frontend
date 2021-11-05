<template>
  <div class="q-gutter-y-md">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="price" label="Цена за еденицу" />
        <q-tab name="servicePrice" label="Настройка цены" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="price" >
          <div class="row">
            <div class="col">
              <decimal-input
                v-model="unit_price"
                @input="changePriceByGuid"
                :labeled="false"
                :outlined="false"
                :clearable="false"
                :label="$t('pages.dictionary.service.field.unit_price.label')"
                :hint="$t('pages.dictionary.service.field.unit_price.hint')"
              />
            </div>
            <div class="col">
              <date-input-format
                v-model="price_date"
                @input="changePriceByGuid"
                :outlined="false"
                :label="$t('pages.dictionary.service.field.price_date.label')"
                :hint="$t('pages.dictionary.service.field.price_date.hint')"
              />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="servicePrice">
          <div
            class="row"
            v-for="price in freshPrice" :key="price.guid"
          >
            <div class="col">
              <decimal-input
                v-model="price.price"
                @input="onChangePrice"
                :labeled="false"
                :outlined="false"
                :label="$t('pages.dictionary.service.field.unit_price.label')"
                :hint="$t('pages.dictionary.service.field.unit_price.hint')"
                :rules="[val => !!val || $t('rules.required')]"
              />
            </div>
            <div class="col">
              <date-input-format
                v-model="price.start_date"
                @input="onChangePrice"
                :outlined="false"
                :label="$t('pages.dictionary.service.field.price_date.label')"
                :hint="$t('pages.dictionary.service.field.price_date.hint')"
              />
            </div>
            <div class="col-auto">
              <q-card-actions>
                <delete-button @click="removeItem(price.guid)" />
              </q-card-actions>
            </div>
          </div>

          <q-card-actions align="right">
            <plus-button @click="addItem"/>
          </q-card-actions>
        </q-tab-panel>
      </q-tab-panels>
      <q-banner
        inline-actions
        dense
        rounded
        class="bg-red text-white"
        v-if="error"
      >
        {{ errorMessage }}

      </q-banner>
    </q-card>

  </div>
</template>

<script>
import DecimalInput from '@/ui/form-inputs/DecimalInput'
import DateInputFormat from '@/ui/form-inputs/DateInputFormat'
import DataFormMixin from '../mixins/DataForm'
import PlusButton from '@/ui/buttons/PlusButton'
import DeleteButton from '@/ui/buttons/DeleteButton'
import { mapActions } from 'vuex'
import { handleResponse } from '@/utils'
// import TextInput from '@/ui/form-inputs/TextInput'

export default {
  name: 'SelectPrices',
  mixins: [DataFormMixin],
  components: {
    // TextInput,
    PlusButton,
    DeleteButton,
    DecimalInput,
    DateInputFormat
  },
  props: {
    service: {
      type: String,
      required: true
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: 'Тестовое сообщение'
    }
  },
  data () {
    return {
      guid: 0,
      maxGuid: 0,
      unit_price: 0,
      price_date: null,
      serviceId: this.service,
      prices: [],
      tab: 'price'
    }
  },
  computed: {
    canDelete () {
      return this.prices.length > 1
    },
    freshPrice () {
      return this.prices.filter(item => item.deleted === false)
    }
  },
  methods: {
    ...mapActions('measure', ['fetchPriceByService']),
    async refetch () {
      await this.fetchPriceData()
      if (this.serviceId === '0') {
        const payload = this.getPriceObject()
        this.prices.push(payload)
      }
      this.onChangePrice()
    },
    async fetchPriceData () {
      const response = await this.fetchPriceByService(this.serviceId)
      handleResponse(response).forEach((price) => {
        const payload = this.getPriceObject()

        payload.id = price.id
        payload.service = price.service
        payload.price = price.price
        payload.start_date = price.start_date
        payload.deleted = price.deleted
        payload.version = price.version

        this.prices.push(payload)
      })
    },
    // Generate new id for element
    getPriceObject () {
      const payload = {
        guid: this.guid++,
        id: 0,
        service: 0,
        price: 0,
        start_date: null,
        deleted: false,
        version: 0
      }
      return payload
    },
    addItem () {
      const payload = this.getPriceObject()
      this.prices.push(payload)
      this.onChangePrice()
    },
    removeItem (guid) {
      // The last price couldn't be deleted
      if (this.canDelete) {
        let index = 0
        this.prices.forEach((price) => {
          if (price.guid === guid) {
            if (price.id === 0) {
              this.prices.splice(index, 1)
            } else {
              price.deleted = true
            }
          } else {
            index++
          }
        })
        this.onChangePrice()
      }
    },
    onChangePrice (val) {
      this.prices.forEach((price) => {
        if (typeof price.price === 'string') {
          price.price = Number(price.price)
        }
      })
      this.comparePrices()
      this.sendPrices()
    },
    sendPrices () {
      const newPrices = []
      this.prices.forEach((price) => {
        newPrices.push({
          id: price.id,
          service: price.service,
          price: price.price,
          start_date: price.start_date,
          deleted: price.deleted,
          version: price.version
        })
      })
      this.$emit('fetch', newPrices)
    },
    changePriceByGuid (val) {
      this.prices.forEach((price) => {
        if (price.guid === this.maxGuid) {
          price.price = this.unit_price
          price.start_date = this.price_date
        }
      })
      this.onChangePrice()
    },
    comparePrices (item) {
      // calculate max date
      const maxDate = Math.max.apply(null, this.prices.map(
        function (p) {
          return Date.parse(`${p.start_date}T00:01:01.001Z`) || 0
        })
      )
      this.prices.forEach((price) => {
        const currDate = Date.parse(`${price.start_date}T00:01:01.001Z`) || 0
        // compare to current date value
        if (maxDate === currDate) {
          this.maxGuid = price.guid
          this.unit_price = price.price
          this.price_date = price.start_date
        }
      })
    }
  },
  mounted () {
    this.refetch()
  }
}
</script>

<style lang="sass" scoped>
  .row > div
    padding: 1px 5px
</style>
