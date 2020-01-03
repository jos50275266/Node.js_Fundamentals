async function notifyCustomer() {
    const customer = await getCustomer(1);
    console.log('Customer: ', customer);
    if (customer.isGold) {
        const topMovies = await getTopMovies();
        console.log('Top movies: ', topMovies)
        const sentEmail = await sendEmail(customer.email, topMovies);
        console.log('Email sent..:', sentEmail)
    }
}

notifyCustomer();

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'Yongsu Jeong',
                isGold: true,
                email: 'jos50275266@gmail.com'
            })
        }, 4000)
    })
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2'])
        })
    })
}

function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let getemail_movie = `${email} + "   "+ ${movies}`;
            resolve(getemail_movie);
        })
    })
}