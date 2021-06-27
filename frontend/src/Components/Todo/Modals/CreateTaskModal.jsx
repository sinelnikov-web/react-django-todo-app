import {useFormik} from "formik";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {createTask} from "../../../Redux/todo-reducer";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {connect} from "react-redux";

const CreateTaskModal = ({createModal, setCreateModal, createTask}) => {

    const isUpdating = useSelector(state => state.todo.isUpdating)

    const onSubmit = (data) => {
        const formData = new FormData()
        Object.keys(data).forEach(key => formData.append(key, data[key]))
        createTask(formData).then(() => {
            formik.resetForm()
            setCreateModal(false)
        })

    }

    const formik = useFormik({
        initialValues: {
            title: '',
            description: ''
        },
        onSubmit
    })

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    return(
        <div className={`custom-modal ${createModal ? "open" : ""}`}>
            <div className="modal__body shadow">
                <span onClick={() => setCreateModal(false)} className={"modal__close"}><FontAwesomeIcon icon={faTimes}/></span>
                <h1 className="modal__title">Create Task</h1>
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
                    <button type={"submit"} className="todo__add">{isUpdating ? <Spin indicator={antIcon} /> : "Create"}</button>
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = (state) => ({

})

export default connect(mapDispatchToProps, {createTask})(CreateTaskModal)