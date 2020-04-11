import client from '@utils/axios';
export const POST_ADD = 'POST_ADD';
export const GET_PROJECTS = 'GET_PROJECTS';
export const SET_PROJECTS = 'SET_PROJECTS';
export default {
  [POST_ADD]: ({ commit, rootState }, data) => {
    return new Promise((resolve, reject) => {
      client.post('/projects/add', data, { headers: {'access_token': rootState.auth.token, 'Content-Type': 'multipart/form-data'} }).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
[GET_PROJECTS]: ({ commit }) => {
  return new Promise((resolve, reject) => {
    client
      .get('projects/get')
      .then((response) => {
      commit('SET_PROJECTS', response.data.projects)
      resolve(response)
      })
      .catch(error => {
      reject(error)
    })
  })
}
}