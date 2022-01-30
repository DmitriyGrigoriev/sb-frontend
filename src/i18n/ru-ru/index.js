// export { default as auth } from './auth'
// import auth from './auth'
// import * as apps from './apps'
// import * as errors from './errors'
// import * as menus from './menus'

export default {
  messages: {
    event: {
      loading: 'Загрузка',
      save: 'Данные успешно сохранены.',
      delete: 'Данные удалены.',
      error: 'Произошла ошибка.',
      error404: 'Ой. Здесь ничего нет...',
      custom_error: 'Ошибка выполнения:'
    }
  },
  rules: {
    required: '* Это поле не может быть пустым',
    someEnter: 'Пожалуйста, введите что-нибудь.',
    notEmpty: '* Select one'
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
      label: 'Удалить',
      tooltip: 'Удалить'
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
      color: 'grey-8',
      timeout: '5000'
    }
  },
  paths: {
    home: {
      title: 'Главная',
      path: '/home',
      name: 'home_index'
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
      name: 'Псевдоним',
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
      register_success: 'Регистрация прошла успешно',
      invalid_data:
        'Server could not process the request. Please correct the sent data.',
      already_registered:
        'Уже есть аккаунт?',
      no_account:
        'Нет аккаунта?',
      account_created:
        'Пожалуйста, проверьте свою электронную почту, вам выслана ссылка для подтверждения регистрации. ' +
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
    activation: {
      activation_message: 'Активация учетной записи...',
      activation_success: 'Поздравляем, активация вашей учетной записи прошла успешно!',
      activation_failed: 'Ваша учетная запись не прошла проверку :(',
      activation_reason: 'Причина: '
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
        header: 'Восстановление доступа',
        check_email: 'Пожалуйста, проверьте свою электронную почту, на неё выслана инструкция для восстановления пароля.',
        email: 'Укажите ваш Псевдоним для восстановления доступа',
        submit: 'Восстановить доступ'
      },
      set_password: {
        success:
          'Ваш пароль был изменен. Теперь вы можете войти в систему с новым паролем.'
      },
      reset: {
        header: 'Сброс пароля',
        success:
          'Ваш пароль был сброшен. Теперь вы можете войти в систему с новым паролем.',
        enter: 'Изменить пароль',
        remembered: 'Вспомнили свой пароль?'
      },
      errors: {
        email_not_registered: 'Пользователь с таким email не зарегистрирован.',
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
      conflict: {
        status: '409',
        message: 'Попытка cохранить данные не удалась, потому что, другой пользователь обновил или удалил запись. ' +
          'Ваши изменения не были отражены на сервере. ' +
          'Пожалуйста, получите новые значения перед их изменением и повторной попыткой сохранения.'
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
      service_timeout: {
        status: '4000',
        message: 'Превышено время ожидания ответа от сервера.'

      },
      unknown_error: {
        status: '5100',
        message: 'Произошла неизвестная ошибка.'
      },
      internal_server_error: {
        status: '500',
        message: 'Сервер не может обработать запрос, пожалуйста повторите попытку позднее.'
      }
    }
  },
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
    },
    usser_manual: {
      label: 'Руководство пользователя'
    },
    about: {
      label: 'О программе'
    },
    revoke_tokens: {
      // modules.security.components.RevokeTokens
      dialog: {
        title: 'Подтвердите',
        message: 'Вы уверены, что хотите выйти из системы ?'
      },
      text: {
        title: 'Привязка устройств',
        subtitle: 'При выходе из системы некоторые данные остаются привязанными.' +
          'Если вы не отвязывали данные, то при входе в систему, имя входа будет сохранено.' +
          'Вы можете очистить все данные, привязанные к системе. Примечание:' +
          'Данные на этом устройстве также будут отвязаны от системы.'
      },
      buttons: {
        logout: {
          label: 'Отвязать'
        }
      }
    },
    verify_email: {
      // modules.security.components.VerifyEmail
      text: {
        title: 'Проверка почты',
        subtitle: 'Пожалуйста подтвердите адрес электронной почты, чтобы защитить ' +
          'свою учетную запись. Ваш адрес электронной почты будет использован для отправки пароля ' +
          'и информации об обновлениях Системы.',
        message: 'Повторная отправка электронной почты...'
      },
      notify: {
        message: 'Пожалуйста, проверьте свою электронную почту'
      },
      buttons: {
        resend: {
          label: 'Подтвердить email'
        }
      }
    },
    update_password: {
      text: {
        title: 'Изменение пароля',
        subtitle: 'Пароль обеспечивает безопасный доступ к учетной записи ' +
          'в системе УМНЫЙ БИЛЛИНГ и требуется для входа в систему.'
      },
      current_pass: {
        label: 'Текущий пароль',
        placeholder: 'Введите текущий пароль'
      },
      new_pass: {
        label: 'Новый пароль',
        placeholder: 'Введите новый пароль'
      },
      confirm_pass: {
        label: 'Подтверждение пароля',
        placeholder: 'Подтвердите новый пароль'
        // rules: 'Пароли не совпадают'
      },
      buttons: {
        update: {
          label: 'Изменить'
        }
      },
      dialog: {
        title: 'Внимание',
        message: 'Обязательно создайте резервную копию своего нового ' +
          'пароля и храните его в надежном месте.'
      }
    },
    menu: {
      // ui.components.menu
      dialog: {
        title: 'Подтвердите',
        message: 'Вы уверены, что хотите выйти из системы?'
      }
    }
  },
  shortcuts: {
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
    setup: {
      label: 'Настройка биллинга'
    },
    askhelp: {
      label: '#@:buttons.help.label',
      url: 'https://smart-billing.slack.com'
    },
    logout: {
      label: '@:buttons.logout.label'
    },
    service: {
      label: 'Услуги и Цены'
    }
  },
  // Pages
  pages: {
    dictionary: {
      title: 'Настроечные таблицы',
      mode: {
        add: {
          title: 'Добавление'
        },
        edit: {
          title: 'Редактирование'
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
          title: 'Ваши действия',
          message: 'Хотите ввести еще одну запись ? ' +
            'Нажмите <strong>Продолжить</strong>, если Да, или <strong>Вернуться</strong> если хотите вернуться ' +
            'в режим просмотра справочника.',
          buttons: {
            ok: 'Вернуться',
            cancel: 'Продолжить'
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
            ok: '@:buttons.delete.label',
            cancel: '@:buttons.cancel.label'
          }
        }
      },
      measure: {
        title: 'Единицы Измерения',
        help: 'ОКЕИ — Общероссийский классификатор единиц измерения',
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
        add: {
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
      },
      noseries: {
        title: 'Серия Номеров',
        field: {
          code: {
            label: 'Код Серии Номеров',
            hint: 'Введите условное обозначение кода серии номеров.'
          },
          description: {
            label: 'Описание',
            hint: 'Введите описание кода серии номеров.'
          },
          date_order: {
            label: 'Порядок Дат',
            hint: 'Будет ли учитываться порядок дат.'
          }
        }
      },
      noseriesline: {
        title: 'Серия Номеров Строка',
        banner: {
          blocked: {
            text: 'Для просмотра не актуальных Серий Номеров нажмите кнопку',
            button: {
              label: 'Заблокированные'
            }
          },
          unblocked: {
            text: 'Для просмотра актуальных Серий Номеров нажмите кнопку',
            button: {
              label: 'Актуальные'
            }
          }
        },
        field: {
          series_no: {
            label: 'Серия Но',
            hint: 'Введите условное обозначение кода серии номеров.'
          },
          starting_date: {
            label: 'Дата начала',
            hint: 'Введите начальную дату серии номеров.'
          },
          starting_no: {
            label: 'Начальный Но',
            hint: 'Введите начальный номер серии номеров.'
          },
          ending_no: {
            label: 'Конечный Но',
            hint: 'Введите конечный номер серии номеров.'
          },
          last_date_used: {
            label: 'Посл.Исп. Дата',
            hint: 'Последняя использованная дата серии номеров.'
          },
          warning_no: {
            label: 'Предупредительный Но',
            hint: 'Введите номер, после которого будут выдаваться предупреждения.'
          },
          last_no_used: {
            label: 'Последний использованный Но',
            hint: 'Последний номер, использованный в серии номеров.'
          },
          increment_by: {
            label: 'Увеличивать На',
            hint: 'Введите число, на которое будет увеличиваться серия номеров.'
          },
          blocked: {
            label: 'Заблокирована ?',
            hint: 'Заблокирована ли данная серия номеров.'
          }
        }
      },
      servicetype: {
        title: 'Тип Услуги',
        field: {
          code: {
            label: 'Код Типа Услуг',
            hint: 'Введите условное обозначение кода типа услуг.'
          },
          description: {
            label: 'Описание',
            hint: 'Введите описание кода типа услуг.'
          }
        }
      },
      service: {
        title: 'Услуга',
        field: {
          code: {
            label: 'Код Услуги',
            hint: 'Введите условное обозначение кода услуги.'
          },
          description: {
            label: 'Краткое описание услуги',
            hint: 'Введите краткое описание услуги.'
          },
          full_name: {
            label: 'Полное наименование услуги',
            hint: 'Введите полное наименование услуги.'
          },
          service_type: {
            label: '@:pages.dictionary.servicetype.title',
            hint: ''
          },
          unit_of_measure: {
            label: '@:pages.dictionary.measure.title',
            hint: ''
          },
          vat_posting_group: {
            label: '@:pages.dictionary.vat.title',
            hint: ''
          },
          unit_price: {
            label: 'Цена Единицы',
            hint: 'Введите цену услуги.'
          },
          price_date: {
            label: 'Дата начала',
            hint: 'Введите дату начала действия цены по услуге.'
          },
          external_service_code: {
            label: 'Внешний Код Услуги',
            hint: 'Введите внешний rод услуги.'
          }
        }
      }
    },
    setup: {
      noseries: {
        title: 'Серия номеров по умолчанию',
        subtitle: 'Указанная серия номеров будет использоваться в справочниках для автогенерации.'
      }
    },
    users: {
      manage: {
        title: {
          manage: 'Управление пользователями',
          assignRoles: 'Назначение ролей',
          selectRoles: 'Выберите роль, которую нужно назначить пользователю'
        },
        search: {
          placeholder: 'Фильтр по пользователям'
        },
        messages: {
          noUserFound: 'Пользователи не найдены'
        },
        tooltips: {
          hasEmail: 'Пользователь подтвердил свою почту.',
          assignRoles: 'Назначить роли'
        }
      }
    }
  }
}
