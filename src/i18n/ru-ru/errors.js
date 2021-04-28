export default {
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
  }
}
