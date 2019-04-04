const firstName = localStorage.getItem('firstName')
const lastName = localStorage.getItem('lastName')
const email = localStorage.getItem('email')
const token = localStorage.getItem('token')

const defaultUserState = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    token: token,
    dashboardTabIndex: 0
}

export default defaultUserState