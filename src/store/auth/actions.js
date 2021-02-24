import client from '@utils/axios';
export const UNSET_AUTH = 'UNSET_AUTH';
export const SET_AUTH = 'SET_AUTH';
export const POST_LOGIN = 'POST_LOGIN';
export default {
  [POST_LOGIN]: (context, data) => {
    return new Promise((resolve, reject) => {
       client
         .post('auth/login', data)
         .then(response => {
           resolve(response);
         })
         .catch(error => {
           reject(error);
         });
       });
 },
}