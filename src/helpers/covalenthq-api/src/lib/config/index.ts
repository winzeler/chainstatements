
const config = {

    apiKey: process.env.COVALENT_API_KEY,
    apiHost:  "https://api.covalenthq.com",
    concurrency: 10,                                // for axios-concurrency
    retries: 3,                                     // 3 retries
    timeout: 30000,                                 // 30 secconds
}


export default config;