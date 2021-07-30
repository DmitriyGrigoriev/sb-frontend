// export { default as auth } from './auth'
// import auth from './auth'
// import * as apps from './apps'
// import * as errors from './errors'
// import * as menus from './menus'

export default {
  messages: {
    event: {
      loading: 'Загрузка',
      save: 'Данные записаны.',
      delete: 'Данные удалены.',
      error: 'Произошла ошибка.'
    }
  },
  labels: {
    name: 'Имя',
    title: 'Заголовок',
    sort: 'Сортировка'
  },
  buttons: {
    ok: {
      label: 'OK'
    },
    send: {
      label: 'Отправить'
    },
    add: {
      label: 'Добавить'
    },
    addrow: {
      label: 'Добавить',
      tooltip: 'Добавление новой строки.'
    },
    deleterow: {
      label: 'Удалить',
      tooltip: 'Удаление выделенной строки.'
    },
    edit: {
      label: 'Правка'
    },
    help: {
      label: 'Помощь'
    },
    search: {
      label: 'Поиск',
      placeholder: 'Поиск...'
    },
    delete: {
      label: 'Удалить'
    },
    close: {
      label: 'Закрыть'
    },
    submit: {
      label: 'Сохранить'
    },
    reset: {
      label: 'Очистить'
    },
    cancel: {
      label: 'Отмена'
    },
    select: {
      label: 'Выбор'
    },
    logout: {
      label: 'Выход'
    },
    get_started: {
      label: 'Быстрый старт'
    },
    learn_more: {
      label: 'Узнать больше'
    },
    goto_app: {
      label: 'перейти в приложение'
    },
    fullscreen: {
      tooltip: 'Полноэкранный режим'
    },
    refresh: {
      label: 'Обновить',
      tooltip: 'Повторная загрузка данных с сервера'
    },
    download: {
      label: 'Скачвть',
      tooltip: 'Скачать данные с сервера'
    },
    filter: {
      label: 'Фильтр',
      tooltip: 'Установить фильтр'
    }
  },
  notify: {
    default: {
      message: 'Пустое сообщение',
      type: 'positive',
      icon: 'fa-check-circle',
      position: 'bottom-right',
      timeout: '2500'
    }
  },
  paths: {
    home: {
      title: 'Главная',
      path: '/home',
      name: 'home_index'
    }
  },
  table: {
    props: {
      no_data_available: 'Запрос не вернул данные',
      rows_per_page: 'Строк на странице',
      no_filter_result: 'Для этого выражения фильтра нет данных',
      loading: 'Загрузка...'
    }
  },
  auth: {
    // network_error: '@:responses.errors.network_error.message',
    // internal_server_error: '@:responses.errors.internal_server_error.message',
    // service_unavailable: '@:responses.errors.service_unavailable.message',
    submit: 'Submit',
    home: 'На главную',
    navigation: 'Навигация',
    my_account: 'Мой аккаунт',
    administrator: {
      title: 'Администратор'
    },
    superuser: {
      title: 'Суперпользователь',
      users: {
        title: 'Пользователи',
        edit: 'Правка',
        verify: {
          label: 'Проверка',
          message: 'Вы действительно хотите проверить пользователя {user}?'
        },
        fields: {
          name: 'Имя',
          email: 'Email',
          verified: 'Проверено'
        }
      },
      failed: 'Action failed',
      success: 'Action was successful'
    },
    labels: {
      email: 'Почта',
      name: 'Имя пользователя',
      password: 'Пароль',
      remember_me: 'Запомнить меня',
      repeat_password: 'Повторите пароль'
    },
    errors: {
      password_length:
        'Минимальная длина пароля {length} символов.',
      password_match: 'Пароли не совпадают.',
      email: 'Пожалуйста, введите правильный email адрес.',
      email_required: '* Заполните это поле.'
    },
    login: {
      login: 'Вход в аккаунт',
      create: 'Создание аккаунта',
      enter: 'Войти',
      password_forgot: 'Забыли свой пароль?',
      verification_required:
        'Данная учётная запись неактивна.' +
        'Пожалуйста, проверьте электронную почту и подтвердите электронный адрес для этого аккаунта.',
      invalid_credentials:
        'Срок действия вашего токена истёк. ' +
        'Возможные причины произошедшего: ' +
        '1)Вы ошиблись при вводе почты или пароля ' +
        '2)Вы не активировали свою учётную запись ' +
        '3)Производятся технические работы и ресурс закрыт для общего доступа',
      invalid_credentials_html:
        '<strong>Произошла ошибка при входе в аккаунт</strong></br>' +
        '1) Возможные причины произошедшего:</br>' +
        '2) Вы ошиблись при вводе <strong>почты или пароля</strong></br>' +
        '3) Вы <strong>не активировали</strong> свою учётную запись</br>' +
        '4) Производятся технические работы и ресурс закрыт для общего доступа',
      login_expired:
        'Срок действия токена истек, пожалуйста, повторите вход!',
      email: '@:auth.labels.email',
      password: '@:auth.labels.password',
      remember_me: '@:auth.labels.remember_me'
    },
    register: {
      register: 'Регистрация',
      invalid_data:
        'Server could not process the request. Please correct the sent data.',
      already_registered:
        'Уже есть аккаунт?',
      no_account:
        'Нет аккаунта?',
      account_created:
        'Пожалуйста, проверьте свою электронную почту, вым выслана ссылка для подтверждения регистрации. ' +
        'Этот процесс может занять до 10 минут. ' +
        'Пожалуйста, проверьте папку со спамом, если письмо не было получено.',
      email: '@:auth.labels.email',
      name: '@:auth.labels.name',
      password: '@:auth.labels.password',
      repeat_password: '@:auth.labels.repeat_password',
      errors: {
        password_length: '@:auth.errors.password_length',
        password_match: '@:auth.errors.password_match',
        email: '@:auth.errors.email',
        email_required: '@:auth.errors.email_required'
      },
      check_email:
        'You want to register with the email address {email}, is this correct?'
    },
    verification: {
      verification_success: 'Your e-mail has been verified. You can now login.',
      verification_failed: 'Verification has failed.'
    },
    logout: {
      logout_confirmation: 'Вы уверены, что хотите выйти из системы?',
      confirm: 'Подтверждение',
      logout: '@:buttons.logout.label',
      cancel: '@:buttons.cancel.label'
    },
    password: {
      forgot: {
        header: 'Восстановление пароля',
        check_email: 'Please check your email to reset your password.',
        email: 'Укажите ваш email для восстановления доступа',
        submit: 'Восстановить мой пароль'
      },
      reset: {
        header: 'Reset your password',
        success:
          'Your password has been reset. You can now login with the new password.'
      },
      errors: {
        password_length: '@:auth.errors.password_length',
        password_match: '@:auth.errors.password_match',
        required_field: 'Обязательное поле.'
      }
    }
  },
  users: {
    user: {
      id: 'id',
      name: '@:auth.labels.name',
      email: '@:auth.labels.email',
      account: 'Профиль',
      phone: 'Телефон'
    }
  },
  // Application
  app: {
    product: {
      name: 'УМНЫЙ БИЛЛИНГ',
      descr1: 'Биллинг услуг',
      descr2: 'Таможенного Представителя',
      descr3: 'Система Управления',
      slogan: 'Деньги любят счёт - Обращайтесь!',
      author: 'Dmitriy Grigorev <dimag@inbox.ru>',
      version: '0.1.1'
    }
  },
  // Errors
  responses: {
    errors: {
      bad_request: {
        status: '400',
        message: 'Cервер не смог понять запрос из-за недействительного синтаксиса.'
      },
      network_error: {
        status: '460',
        message: 'Ошибка сети. Пожалуйста, проверьте подключение к интернету.'
      },
      no_permission: {
        status: '461',
        message: 'У вас нет разрешения для выполнения данного действия.'
      },
      service_unavailable: {
        status: '462',
        message: 'Сервер не может обработать запрос, пожалуйста повторите попытку позднее.'
      },
      internal_server_error: {
        status: '500',
        message: 'Сервер не может обработать запрос, пожалуйста повторите попытку позднее.'
      }
    }
  },
  // Permission
  // permission: {
  //   role: {
  //     role: 'Настройка роли',
  //     role_user: 'Управление ролями пользователя',
  //     role_rights: 'Управление правами роли',
  //   },
  //   user: {
  //     user: 'Управление пользователями',
  //     user_role: 'Управление ролями пользователей',
  //   },
  //   errors: {
  //     no_permission: {
  //       status: '@:responses.errors.no_permission.status',
  //       message: '@:responses.errors.no_permission.message',
  //     },
  //   },
  // },
  // Menus.vue
  components: {
    shortcuts: {
      label: 'Ярлыки'
    },
    announcements: {
      label: 'Анонсы',
      message: 'Анонсов пока нет.'
    },
    releases: {
      label: 'Релизы',
      message: 'Релизов пока нет.'
    },
    useful_links: {
      label: 'Полезные ссылки',
      message: 'Полезных ссылок пока нет.'
    }
  },
  menus: {
    dashboard: {
      label: 'Панель управления'
    },
    profile: {
      label: 'Профиль'
    },
    admin: {
      label: 'Администрирование'
    },
    security: {
      label: 'Безопасность'
    },
    settings: {
      label: 'Настройки'
    },
    askhelp: {
      label: '#Помощь',
      url: 'https://smart-billing.slack.com'
    },
    logout: {
      label: 'Выход'
    }
  },
  // roles: {
  //   role: {
  //     name: 'Имя роли',
  //     code: 'Код роли',
  //     id: 'Ид'
  //   }
  // },
  // Pages
  pages: {
    dictionary: {
      title: 'Настроечные таблицы',
      measure: {
        title: 'Единицы Измерения',
        help: 'ОКЕИ — Общероссийский классификатор единиц измерения',
        mode: {
          add: {
            title: 'Добавление'
          },
          edit: {
            title: 'Редактирование'
          }
        },
        field: {
          code: {
            label: 'Код Ед. Измерения',
            hint: 'Введите условное обозначение еденицы измерения (например: шт, кг).'
          },
          okei_code: {
            label: 'Код ОКЕИ',
            hint: 'Введите международный код еденицы измерения.'
          },
          description: {
            label: 'Описание',
            hint: 'Введите описание еденицы измерения'
          }
        },
        buttons: {
          refresh: {
            label: '@:buttons.refresh.label',
            tooltip: '@:buttons.refresh.tooltip'
          }
        },
        dialogues: {
          reset: {
            title: 'Подтвердите',
            message: 'Вы уверены, что хотите очистить форму?',
            buttons: {
              ok: '@:buttons.ok.label',
              cancel: '@:buttons.cancel.label'
            }
          },
          postsave: {
            title: 'Успешное сохранение',
            message: 'Вы хотите ввести еще одну еденицу измерения ? ' +
              'Нажмите <strong>Далее</strong>, если Да, или <strong>В начало</strong> если хотите вернуться ' +
              'в режим просмотра справочника.',
            buttons: {
              ok: 'В начало',
              cancel: 'Далее'
            }
          },
          beforeleave: {
            title: '',
            message: 'Вы действительно хотите уйти с этой страницы? Данные не будут сохранены.'
          },
          confirm_delete: {
            title: 'Подтвердите',
            message: 'Вы уверены, что хотите удалить отмеченные записи?',
            buttons: {
              ok: '@:buttons.ok.label',
              cancel: '@:buttons.cancel.label'
            }
          }
        },
        add: {
          title: 'Единицы Измерения',
          help: {
            title: 'Помощь',
            message: '<p>Добавьте в Общероссийский классификатор единиц измерения ' +
              'соответствующие данные, используемые вами в вашей сфере деятельности. .</p>'
          },
          notify: {
            loading: 'Сохранение еденицы измерения...'
          }
        }
      },
      vat: {
        title: 'НДС  Учетная Группа',
        field: {
          code: {
            label: 'Код Учетной Группы',
            hint: 'Введите условное обозначение кода учетной группы.'
          },
          vat: {
            label: 'НДС %',
            hint: 'Введите значение НДС для учётной группы.'
          },
          description: {
            label: 'Описание',
            hint: 'Введите описание кода учетной группы.'
          },
          vatextempt: {
            label: 'Освоб. от НДС',
            hint: 'Признак освобождения от НДС.'
          }
        }
      }
    }
  }
}
