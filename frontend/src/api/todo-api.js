import axios from "axios";

export const APIInstance = axios.create({
    baseURL: 'https://sinelnikov-todo-app.herokuapp.com/api/',
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

export const todoAPI = {
    getTodo() {
        return APIInstance.get('todo/').then(r => r.data)
    },
    createTask(task) {
        return APIInstance.post(`todo/tasks/`, task).then(r => r.data)
    },
    updateTask(task) {
        return APIInstance.put(`todo/tasks/${task.get('id')}`, task).then(r => r.data)
    },
    deleteTask(taskId) {
        return APIInstance.delete(`todo/tasks/${taskId}`).then(r => r.data)
    }
}