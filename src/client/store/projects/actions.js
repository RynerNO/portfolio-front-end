import client from '@utils/axios';
export const POST_ADD = 'POST_ADD';
export const POST_EDIT = 'POST_EDIT';
export const POST_DELETE = 'POST_DELETE';
export const POST_UPDATE = 'POST_UPDATE';
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
  [POST_EDIT]: ({ commit, rootState }, data) => {
    return new Promise((resolve, reject) => {
      client.post('/projects/edit', data, { headers: {'access_token': rootState.auth.token, 'Content-Type': 'multipart/form-data'} }).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  [POST_DELETE]: ({ commit, rootState }, data) => {
    return new Promise((resolve, reject) => {
      client.post('/projects/delete', data, { headers: {'access_token': rootState.auth.token, 'Content-Type': 'multipart/form-data'} }).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  [POST_UPDATE]: ({ commit, rootState }, data) => {
    return new Promise((resolve, reject) => {
      client.post('/projects/update', data, { headers: { 'access_token': rootState.auth.token, 'Content-Type': 'multipart/form-data'} }).then((response) => {
        resolve(response)
      }).catch((err) => {
        reject(err)
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