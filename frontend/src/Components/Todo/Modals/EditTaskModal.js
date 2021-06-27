import {useFormik} from "formik";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {createTask, updateTask} from "../../../Redux/todo-reducer";
import { connect } from 'react-redux'
import {message, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const EditTaskModal = ({editModals, setEditModal, task, updateTask}) => {

    const isUpdating = useSelector(state => state.todo.isUpdating)

    const onSubmit = (data) => {
        const formData = new FormData()
        Object.keys(data).forEach(key => formData.append(key, data[key]))
        formData.append('id', task.id)
        updateTask(formData).then(() => {
            setEditModal(prev => ({...prev, [task.id]: false}))
        })
    }

    const formik = useFormik({
        initialValues: {
            title: task.title,
            description: task.description
        },
        onSubmit
    })

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    return(
        <div className={`custom-modal ${editModals[task.id] ? "open" : ""}`}>
            <div className="modal__body shadow">
                <span onClick={() => setEditModal(prev => ({...prev, [task.id]: false}))} className={"modal__close"}><FontAwesomeIcon icon={faTimes}/></span>
                <h1 className="modal__title">Edit Task</h1>
                <form onSubmit={formik.handleSubmit} className="modal__form" autoComplete={'off'}>
                    <div className="form__input-block">
                        <label htmlFor="title" className="form__label">Title</label>
                        <input value={formik.values.title}
                               onChange={formik.handleChange}
                               type="text"
                               className="form__input"
                               name={'title'}
                               placeholder={'Title'}
                        />
                    </div>
                    <div className="form__input-block">
                        <label htmlFor="description" className="form__label">Description</label>
                        <textarea  value={formik.values.description}
                                   onChange={formik.handleChange}
                                   className="form__input"
                                   name={'description'}
                                   placeholder={'Description'}/>
                    </div>
                    <button disabled={isUpdating} type={"submit"} className="todo__add">{isUpdating ? <Spin indicator={antIcon} /> : "Update"}</button>
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = (state) => ({})

export default connect(mapDispatchToProps, {updateTask})(EditTaskModal)