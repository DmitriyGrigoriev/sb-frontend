// import { client } from '@/boot/apollo';
// import request from '@/libs/requestdata'
// import { handleResponse, handleError } from '@/libs/util'
// import { GET_CURRENT_USER } from '@/graphql/queries';
// import {
//   UPLOAD_USER_AVATAR_MUTATION,
//   UPDATE_PROFILE_MUTATION,
//   CHOOSE_AVATAR_MUTATION
// } from '@/graphql/mutations';
import { CURRENT_USER } from '@/queries'
import { apiService } from './api.service'

export const profileService = {
  async getCurrentUser () {
    await apiService.mount401Interceptor()
    await apiService.setHeader()
    return apiService.customRequest(CURRENT_USER);
    // return response
    // return client
    //   .query({
    //     query: GET_CURRENT_USER
    //   })
    //   .then(handleResponse)
    //   .catch(handleError)
  },
  uploadUserAvatar ({ image }) {
    // return client
    //   .mutate({
    //     mutation: UPLOAD_USER_AVATAR_MUTATION,
    //     variables: {
    //       image: image
    //     }
    //   })
    //   .then(handleResponse)
    //   .catch(handleError)
  },
  updateProfile ({ name, operatingUnitId, position, contactNumber }) {
    // return client
    //   .mutate({
    //     mutation: UPDATE_PROFILE_MUTATION,
    //     variables: {
    //       name: name,
    //       operatingUnitId: operatingUnitId,
    //       position: position,
    //       contactNumber: contactNumber
    //     },
    //     update: (store, { data: { updateUser } }) => {
    //       const data = store.readQuery({
    //         query: GET_CURRENT_USER
    //       })
    //
    //       data.getCurrentUser.name = updateUser.name
    //       data.getCurrentUser.position = updateUser.position
    //       data.getCurrentUser.contact_number = updateUser.contact_number
    //       data.getCurrentUser.operating_unit = updateUser.operating_unit
    //
    //       console.log(data)
    //
    //       store.writeQuery({
    //         query: GET_CURRENT_USER,
    //         data
    //       })
    //     }
    //   })
    //   .then(handleResponse)
    //   .catch(handleError)
  },
  chooseAvatar ({ imageId }) {
    // return client
    //   .mutate({
    //     mutation: CHOOSE_AVATAR_MUTATION,
    //     variables: {
    //       imageId: imageId
    //     }
    //   })
    //   .then(handleResponse)
    //   .catch(handleError)
  }
}
