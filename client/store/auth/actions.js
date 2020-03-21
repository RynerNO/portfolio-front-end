import client from '@utils/axios';
export const SET_AUTH = 'SET_AUTH';

export const POST_REGISTER = 'POST_REGISTER';

export const POST_LOGIN = 'POST_LOGIN';

export const UNSET_AUTH = 'UNSET_AUTH';

export const POST_FORGOT_PASSWORD = 'POST_FORGOT_PASSWORD';

export const POST_RESET_PASSWORD = 'POST_RESET_PASSWORD';

export const POST_CONFIRM_EMAIL = 'POST_CONFIRM_EMAIL';

export const POST_RESEND_EMAIL_CONFIRMATION = 'POST_RESEND_EMAIL_CONFIRMATION';
export default {
  [POST_REGISTER]: (context, data) => {
    return new Promise((resolve, reject) => {
      client
        .post('auth/register', data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
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
  [POST_FORGOT_PASSWORD]: (context, data) => {
    return new Promise((resolve, reject) => {
      client
        .post('auth/password/reset', data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  [POST_RESET_PASSWORD]: (context, data) => {
    return new Promise((resolve, reject) => {
      client
        .post(`auth/password/reset/${data.token}`, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  [POST_CONFIRM_EMAIL]: (context, data) => {
    return new Promise((resolve, reject) => {
      client
        .post(`auth/email/confirm`, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  [POST_RESEND_EMAIL_CONFIRMATION]: (context, data) => {
    return new Promise((resolve, reject) => {
      client
        .post(`auth/email/resend`, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
