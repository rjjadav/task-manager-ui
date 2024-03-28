import { useEffect, useState } from "react";
import TaskDetails from "../../components/TaskDetails/TaskDetails"
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const EditTaskPage = () => {
    const [taskDetails, setTaskDetails] = useState(null);

    let {id} = useParams();
    const getTaskDetails = () => {
        axios.get(`${BASE_URL}tasks/${id}`).then(response => {
            setTaskDetails(response.data);
        })
    }

    useEffect(() => {
        getTaskDetails();
    }, [])

    return <>
        <TaskDetails edit={true} taskDetails={taskDetails} id={id}/>
    </>
}

export default EditTaskPage;