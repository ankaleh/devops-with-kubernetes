import axios from 'axios'

const baseURL = process.env.REACT_APP_BACKEND_URL

const axiosInstance = axios.create({ baseURL })

export const getTodos = async () => {
    try {
        const response = await axiosInstance.get('/todos')
        return response
      } catch (error) {
        console.log(error)
      }
}

export const postTodo = async (todo) => {
    try {
        const response = await axiosInstance.post('/todos', todo)//await axios.post('http://project-backend-svc:3456/api/todos', todo)
        console.log(response.data)
        return response
      } catch (error) {
        console.log(error)
      }
}

