export default {
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
        'Пожалуйста, проверьте электронную почту и подтвердите свою учетную запись.',
      invalid_credentials:
        'Произошла ошибка при входе в аккаунт. ' +
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
      logout: '@:buttons.logout',
      cancel: '@:buttons.cancel'
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
  }
}
