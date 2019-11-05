export function signInRequest(telefone, codigo) {
  return {
    type: "@auth/SIGN_IN_REQUEST",
    payload: { telefone, codigo }
  };
}

export function signInSuccess(token, user) {
  return {
    type: "@auth/SIGN_IN_SUCCESS",
    payload: { token, user }
  };
}

export function signUpRequest(telefone) {
  return {
    type: "@auth/SIGN_UP_REQUEST",
    payload: { telefone }
  };
}

export function resetRequest(telefone) {
  return {
    type: "@auth/RESET_REQUEST",
    payload: { telefone }
  };
}

export function signUpSuccess(telefone, codigo) {
  return {
    type: "@auth/SIGN_UP_SUCCESS",
    payload: { telefone, codigo }
  };
}

export function signFailure() {
  return {
    type: "@auth/SIGN_FAILURE"
  };
}

export function setOffline() {
  return {
    type: "@auth/OFFLINE"
  };
}

export function setOnline() {
  return {
    type: "@auth/ONLINE"
  };
}

export function signOut() {
  return {
    type: "@auth/SIGN_OUT"
  };
}
