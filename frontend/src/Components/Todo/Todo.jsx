import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencilAlt, faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteTask, getTodo, updateTask} from "../../Redux/todo-reducer";
import Loader from "../Loader/Loader";
import CreateTaskModal from "./Modals/CreateTaskModal";
import EditTaskModal from "./Modals/EditTaskModal";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";


const Todo = () => {

    const [fetch, setFetch] = useState({})
    const [createModal, setCreateModal] = useState(false)
    const [editModals, setEditModals] = useState({})

    const isFetching = useSelector(state => state.todo.isFetching)
    const tasks = useSelector(state => state.todo.todo?.tasks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTodo())
    }, [])

    const handleComplete = (task) => {
        let formData = new FormData()
        let newTask = {...task, completed: !task.completed}
        Object.keys(newTask).forEach(key => formData.append(key, newTask[key]))
        setFetch(prev => ({...prev, [task.id]: {completeFetching: true}}))
        dispatch(updateTask(formData)).then(() => setFetch(prev => ({...prev, [task.id]: {completeFetching: false}})))
    }

    const handleDelete = (task) => {
        setFetch(prev => ({...prev, [task.id]: {deleteFetching: true}}))
        dispatch(deleteTask(task.id)).then(() => setFetch(prev => ({...prev, [task.id]: {deleteFetching: false}})))
    }

    const openCreateModal = () => {
        setCreateModal(true)
    }

    const openEditModal = (taskId) => {
        setEditModals(prev => ({...prev, [taskId]: true}))
    }

    if (isFetching) {
        return <Loader/>
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    return (
        <>
            <div className={'todo shadow-lg'}>
                <div className="todo__controls">
                    <button onClick={openCreateModal} className="todo__add">Add</button>
                </div>
                <div className="todo__list">
                    {tasks.map((task, index) => {
                        return (
                            <div key={task.id} className="todo__item shadow">
                                <div className="todo__item-info">
                                    <h2 title={task.title} className="todo__item-title">{task.completed ?
                                        <strike>{task.title}</strike> : task.title}</h2>
                                    <p className="todo__item-description">{task.completed ?
                                        <strike>{task.description}</strike> : task.description}</p>
                                </div>
                                <div className="todo__item-controls">
                                    <button onClick={() => handleComplete(task)} className="todo__complete">
                                        {fetch[task.id]?.completeFetching ? <Spin indicator={antIcon} /> : <FontAwesomeIcon icon={faCheck}/>}
                                    </button>
                                    <button onClick={() => openEditModal(task.id)} className="todo__edit">
                                        <FontAwesomeIcon icon={faPencilAlt}/>
                                    </button>
                                    <button onClick={() => handleDelete(task)} className="todo__delete">
                                        {fetch[task.id]?.deleteFetching ? <Spin indicator={antIcon} /> : <FontAwesomeIcon icon={faTimes}/>}
                                    </button>
                                </div>
                                <EditTaskModal task={task} setEditModal={setEditModals} editModals={editModals}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            <CreateTaskModal createModal={createModal} setCreateModal={setCreateModal}/>
        </>
    )
}


export default Todo