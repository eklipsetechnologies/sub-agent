import axios from './axios'


export const getInsuredAssets = () => new Promise(async (res, rej) => {
    let token = "";
    if (localStorage.getItem('userToken')) {
        token = JSON.parse(localStorage.getItem('userToken'));
    }
    axios.get('/insurance/insured-assets', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            res(response.data)
        })
        .catch(error => {
            rej(error)
        })
})

export const storeInsurance = param => new Promise(async (res, rej) => {
    let token = "";
    if (localStorage.getItem('userToken')) {
        token = JSON.parse(localStorage.getItem('userToken'));
    }
    axios.post('/insurance/createCover', { ...param }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {

            res(response.data)
        })
        .catch(error => rej(error))
})

export const getInsuredAssetsById = id => new Promise(async (res, rej) => {
    let token = await SecureStore.getItemAsync(TOKEN)

    axios.get(`/insurance/insured-assets/${id}`, {
        headers: {
            'Authorization': `Bearer ${token || state.auth.token}`
        }
    })
        .then(response => {
            res(response.data)
        })
        .catch(error => rej(error))
})

export const getAssetClaims = id => new Promise(async (res, rej) => {
    let token = await SecureStore.getItemAsync(TOKEN)
    axios.get(`/claims/asset/${id}`, {
        headers: {
            'Authorization': `Bearer ${token || state.auth.token}`
        }
    })
        .then(response => {
            res(response.data)
        })
        .catch(error => rej(error))
})

export const getHealthPlans = () => new Promise(async (res, rej) => {
    let token = await SecureStore.getItemAsync(TOKEN)
    axios.get(`/insurance/health/plans`, {
        headers: {
            'Authorization': `Bearer ${token || state.auth.token}`
        }
    })
        .then(response => {
            res(response.data)
        })
        .catch(error => rej(error))
})

export const getHealthPlansByType = data => new Promise(async (res, rej) => {
    let token = await SecureStore.getItemAsync(TOKEN)
    axios.post(`/insurance/health/plans/filter`, { ...data }, {
        headers: {
            'Authorization': `Bearer ${token || state.auth.token}`
        }
    })
        .then(response => {
            res(response.data)
        })
        .catch(error => rej(error))
})

export const geInsuranceByName = name => new Promise(async (res, rej) => {
    let token = await SecureStore.getItemAsync(TOKEN)
    axios.get(`/insurance/by-name/${name}`, {
        headers: {
            'Authorization': `Bearer ${token || state.auth.token}`
        }
    })
        .then(response => {
            res(response.data)
        })
        .catch(error => rej(error))
})

export const getPhoneBrands = () => new Promise(async (res, rej) => {
    let token = await SecureStore.getItemAsync(TOKEN)
    axios.get(`/gadgets/brands`, {
        headers: {
            'Authorization': `Bearer ${token || state.auth.token}`
        }
    })
        .then(response => {
            res(response.data)
        })
        .catch(error => rej(error))
})
export const queryPhoneDevices = device => new Promise(async (res, rej) => {
    let token = await SecureStore.getItemAsync(TOKEN)
    axios.get(`/gadgets/query/${device}`, {
        headers: {
            'Authorization': `Bearer ${token || state.auth.token}`
        }
    })
        .then(response => {
            res(response.data)
        })
        .catch(error => rej(error))
})