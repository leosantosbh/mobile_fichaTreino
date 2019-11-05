import produce from "immer";

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  offline: false,
  telefone: "",
  codigo: "",
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@auth/SIGN_IN_REQUEST": {
        draft.loading = true;
        break;
      }
      case "@auth/SIGN_IN_SUCCESS": {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case "@auth/SIGN_UP_SUCCESS": {
        draft.telefone = action.payload.telefone;
        draft.codigo = action.payload.codigo;
        break;
      }
      case "@auth/SIGN_FAILURE": {
        draft.loading = false;
        break;
      }
      case "@auth/SIGN_OUT": {
        draft.token = null;
        draft.signed = false;
        draft.telefone = "";
        draft.codigo = "";
        break;
      }
      case "@auth/OFFLINE": {
        draft.offline = true;
        break;
      }
      case "@auth/ONLINE": {
        draft.offline = false;
        break;
      }
      default:
    }
  });
}
