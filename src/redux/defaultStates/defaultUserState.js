const defaultUserState = {
    firstName: null,
    lastName: null,
    email: null,
    token: null,
    redirectToDashboard: false,
    isLoggedIn: false,
    podcasts: [
        {
            name:"Techish",
            slug:"techish",
            start_date:"13 Months",
            hosts:"Abadesi Osunsade and Michael Berhane",
            url:"http://www.techishpod.com/",
            description:"A podcast by two millennials talking about all things tech, pop culture and life. Starring tech founders Abadesi Osunsade and Michael Berhane",
            tags:"tech, pop culture, business, entrepreneurship"
        }
    ]
}

export default defaultUserState