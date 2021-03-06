const firstName = localStorage.getItem('firstName');

const lastName = localStorage.getItem('lastName');

const email = localStorage.getItem('email');

const token = localStorage.getItem('token');

const pk = localStorage.getItem('pk');

const profile =  localStorage.getItem('profile');

const defaultUserState = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    token: token,
    pk: pk,
    dashboardTabIndex: 0,
    registerError: null,
    loginError: null,
    profile,
};

export default defaultUserState;