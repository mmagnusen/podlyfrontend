export const formValidation = {
    firstName: (firstName) => {
        return firstName.length > 0 && firstName.match(/[0-9!@#$%^&*()_+=[\]{};:"\\|,.<>/?]/) === null
    },

    lastName: (lastName) => {
        return lastName.length > 0 && lastName.match(/[0-9!@#$%^&*()_+=[\]{};:"\\|,.<>/?]/) === null
    },

    email: (email) => {
        const emailIsValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        if (email.length > 0 && emailIsValid) {
          return emailIsValid.length > 3
        }
        return false
    },

    password: (password) => {
        return password.length > 7
    }
}