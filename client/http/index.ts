import axios from "axios"

const http = {
    default: axios.create({ baseURL: 'http://localhost:8000/api/v1' }),
    admin: axios.create({ baseURL: 'http://localhost:8000/api/v2' })
}

export default http