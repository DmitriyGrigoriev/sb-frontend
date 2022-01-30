<template>
  <q-page>
    <div class="column">
      <div class="row items-center q-pb-xl full-page">
        <div class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12">
          <div class="col-6 q-gutter-y-lg text-white text-center justify-center">
            <div class="text-h3 text-weight-bold">
              {{ $t('app.product.descr1') }} <br />
              {{ $t('app.product.descr2') }}
            </div>

            <div class="row">
              <div class="offset-4 col-4">
                <q-separator color="secondary" />
              </div>
            </div>

            <div class="text-h5">
              {{ $t('app.product.slogan') }}
            </div>

            <div class="row justify-center q-gutter-md">
              <q-btn
                size="lg"
                class="text-capitalize text-weight-bolder"
                color="primary"
                style="width: 220px;"
                to="/login"
                v-if="!isLoggedIn"
              >
                {{ $t('auth.login.enter')}}
              </q-btn>

              <q-btn
                size="lg"
                class="text-capitalize text-weight-bolder"
                outline
                style="width: 220px;"
                type="a"
                :to="isLoggedIn ? '/dashboard' : '/login'"
                target="_blank"
              >
                {{ $t('buttons.learn_more.label') }}
              </q-btn>
<!--              href="https://docs.smart-billing.ru/"-->
            </div>
          </div>
        </div>
      </div>
<!--      <div class="row bg-white items-center q-py-xl">-->
<!--        <div-->
<!--          class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12"-->
<!--        >-->
<!--          <div class="row q-col-gutter-md">-->
<!--            <div class="col-md-6 col-sm-12 text-center">-->
<!--              <q-img-->
<!--                src="features/responsive.png"-->
<!--                width="300px"-->
<!--              ></q-img>-->
<!--            </div>-->
<!--            <div class="col-md-6 col-sm-12 q-gutter-y-md text-center">-->
<!--              <div class="text-h4">Responsive Design</div>-->
<!--              <div class="text-subtitle1">-->
<!--                Адаптивный веб-дизайн - это подход к веб-дизайну, который делает-->
<!--                так, что веб-страницы смотрятся одинаково хорошо на любых устройствах-->
<!--                и на любых размерах экрана.-->
<!--              </div>-->
<!--              <div>-->
<!--                <q-btn-->
<!--                  size="lg"-->
<!--                  class="text-capitalize text-weight-bolder"-->
<!--                  outline-->
<!--                  color="primary"-->
<!--                  style="width: 220px;"-->
<!--                  type="a"-->
<!--                  href="https://ipms-docs.web.app/"-->
<!--                  target="_blank"-->
<!--                >-->
<!--                  {{ $t('buttons.learn_more.label') }}-->
<!--                </q-btn>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="row bg-white items-center q-py-xl">-->
<!--        <div-->
<!--          class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12"-->
<!--        >-->
<!--          <div class="row q-col-gutter-md">-->
<!--            <div class="col-md-6 col-sm-12 text-center">-->
<!--              <q-img-->
<!--                src="/docs/progressive-web-app.jpg"-->
<!--                width="300px"-->
<!--              ></q-img>-->
<!--            </div>-->
<!--            <div class="col-md-6 col-sm-12 q-gutter-y-md text-center">-->
<!--              <div class="text-h4">Progressive Web Application</div>-->
<!--              <div class="text-subtitle1">-->
<!--                Прогрессивные веб-приложения-это веб-приложения,-->
<!--                которые были разработаны таким образом,-->
<!--                чтобы быть работоспособными, надежными и устанавливаемыми.-->
<!--              </div>-->
<!--              <div>-->
<!--                <q-btn-->
<!--                  size="lg"-->
<!--                  class="text-capitalize text-weight-bolder"-->
<!--                  outline-->
<!--                  color="primary"-->
<!--                  style="width: 220px;"-->
<!--                  type="a"-->
<!--                  :href="DOCS_LINKS.installation"-->
<!--                  target="_blank"-->
<!--                >-->
<!--                  {{ $t('buttons.learn_more.label') }}-->
<!--                </q-btn>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="row bg-black text-white items-center q-py-xl">-->
<!--        <div-->
<!--          class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12"-->
<!--        >-->
<!--          <div class="text-center q-gutter-y-lg">-->
<!--            <div class="text-h4 text-weight-bold">-->
<!--              Manage your projects, better.-->
<!--            </div>-->

<!--            <div class="row">-->
<!--              <div class="offset-4 col-4">-->
<!--                <q-separator color="secondary" />-->
<!--              </div>-->
<!--            </div>-->

<!--            <div class="text-h6">-->
<!--              Ready to upgrade?-->
<!--            </div>-->

<!--            <q-btn-->
<!--              size="lg"-->
<!--              class="text-capitalize text-weight-bolder"-->
<!--              outline-->
<!--              color="primary"-->
<!--              style="width: 220px;"-->
<!--              :to="isLoggedIn ? '/dashboard' : '/login'"-->
<!--            >-->
<!--              Start Using IPMS-->
<!--            </q-btn>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <q-separator spaced />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { DOCS_LINKS } from '@/constants/docs'

export default {
  name: 'PageLanding',
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },
  data () {
    return {
      DOCS_LINKS
    }
  }
}
</script>

<style scoped>
.full-page {
  height: calc(100vh - 50px);
}
</style>
