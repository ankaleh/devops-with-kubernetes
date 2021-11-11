const getRandomString = (randomString) => {
    console.log(new Date(), ': ',randomString)
    setTimeout(() => {
        getRandomString(randomString)
    }, 5000)
}
const randomString = Math.random().toString(36).substring(2, 15)
        + '-' + Math.random().toString(36).substring(2, 6)
            + '-' + Math.random().toString(36).substring(2, 6)
                + '-' + Math.random().toString(36).substring(2, 15)

getRandomString(randomString)
