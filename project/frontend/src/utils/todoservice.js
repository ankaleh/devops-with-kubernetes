import axios from 'axios'


export const getTodos = async () => {
    try {
        const response = await axios.get('http://localhost:8081/api/todos')//await axios.get('http://project-backend-svc:3456/api/todos')
        return response
      } catch (error) {
        console.log(error)
      }
}

export const postTodo = async (todo) => {
    try {
        const response = await axios.post('http://localhost:8081/api/todos', todo)//await axios.post('http://project-backend-svc:3456/api/todos', todo)
        console.log(response.data)
        return response
      } catch (error) {
        console.log(error)
      }
}

