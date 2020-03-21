import {
  SET_AUTH,
  UNSET_AUTH,
  POST_RESEND_EMAIL_CONFIRMATION
} from '@store/auth/actions';
import { mapState } from 'vuex';
import axios from '@utils/axios';
export default {
  computed: {
    ...mapState({
      auth: state => state.auth
    })
  },
  mounted() {
    axios.interceptors.request.use(config => {
      if (!!this.auth.user && !!this.auth.token) {
        config.headers = {
          access_token: this.auth.token
        };
      }
      return config;
    });
  },

  methods: {
    setAuth: function(payload) {
      this.$store.commit(SET_AUTH, payload);
      localStorage.setItem('auth', JSON.stringify(payload));
      this.$router.push('/');
    },

    unsetAuth() {
      localStorage.removeItem('auth');
      this.$store.commit(UNSET_AUTH);
      this.flash('Successfully logged out');
      this.$router.push('/').catch(() => {});
    },
    resendEmailConfirmation() {
      this.$store
        .dispatch(POST_RESEND_EMAIL_CONFIRMATION)
        .then(() => {
          this.flash('Successfully resent email confirmation link.');
        })
        .catch(() => {
          this.flash('Error resending email confirmation link.', 'error');
        });
    }
  }
};
