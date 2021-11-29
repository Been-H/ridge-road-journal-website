import { axiosInstance } from '../axios'

export const checkAuthenticated = (history, req_superuser, bool_return) => {
    axiosInstance.get(`author-auth/${req_superuser ? "?req-supuser=True" : "?req-supuser=False"}`)
    .then((res) => {
        if (res.data === "Not Admin") {
            history.push('/na/')
        }
    })
    .catch((err) => {
        if (err.response.status === 401) {
            if (bool_return) {
                history.push('/na/')
            } else {
                history.push('/na/')
                
            }
        }
    })
}