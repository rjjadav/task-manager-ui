import { Add, DeleteForeverOutlined, DeleteOutline, Edit } from "@mui/icons-material";
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { tasksActions } from "../../store/task/task.slice";


const StatusChip = ({ status }) => {
    let statusText = "Pending";
    let color = "warning";

    switch (status) {
        case 'pending':
            statusText = "Pending";
            color = "warning"
            break;
        case 'in_progress':
            statusText = "In Progress";
            color = "info"
            break;
        case 'done':
            statusText = "Done";
            color = "success"
            break;
        default:
            statusText = "";
            color = ""
            break;
    }

    return <Chip color={color} label={statusText} variant="outlined" size="small"></Chip>

}

const BASE_URL = process.env.REACT_APP_BASE_URL;

const TaskListPage = () => {
    const [taskList, setTaskList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [recordToBeDeleted, setRecordToBeDeleted] = useState(null);

    const tasks = useSelector(state => state.tasks.tasks);
    const dispatch = useDispatch();

    const getTaskList = () => {
        setLoading(true);
        axios.get(`${BASE_URL}tasks`).then(response => {
            if (response && response.data) {
                setTaskList(response.data);
                dispatch(tasksActions.loadTasks({tasks: response.data}));
            }
            setLoading(false);

        }).catch(error => {
            setLoading(false);

        })
    }

    const removeTaskHandler = () => {
        axios.delete(`${BASE_URL}tasks/${recordToBeDeleted}`).then(response => {
            handleClose();
            dispatch(tasksActions.removeTask({id: recordToBeDeleted}));
            getTaskList();
        }).catch(e => {
            console.log(e);
        })
    }

    const openRemoveTaskDialog = (id) => {
        setRecordToBeDeleted(id);
        setOpenConfirmDelete(true);
    }

    const handleClose = () => {
        setOpenConfirmDelete(false);
        setRecordToBeDeleted(null);
    };    

    useEffect(() => {
        if(tasks.length > 0) {
            setTaskList(tasks);
        } else {
            getTaskList();
        }
    }, [])



    return <>
        <div className="flex justify-between  px-4 pb-4 content-center">
            <Typography variant="h6" gutterBottom>
                Task List
            </Typography>

            <Link to="/add">
                <Button variant="outlined" startIcon={<Add />} size="small">New Task</Button>
            </Link>
        </div>
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        !loading && taskList.length > 0 && taskList.map(e => <TableRow key={e._id}>
                            <TableCell>{e.title}</TableCell>
                            <TableCell>{e.description}</TableCell>
                            <TableCell><StatusChip status={e.status} /></TableCell>
                            <TableCell align="right">
                                <Tooltip title="Edit Task">
                                    <Link to={`/edit/${e._id}`}>
                                        <IconButton color="info" size="small">
                                            <Edit fontSize="inherit" />
                                        </IconButton>
                                    </Link>
                                </Tooltip>
                                <Tooltip title="Delete Task">
                                    <IconButton color="error" size="small" onClick={() => openRemoveTaskDialog(e._id)}>
                                        <DeleteOutline fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>)
                    }

                    {
                        !loading && taskList.length == 0 && <TableRow>
                            <TableCell colSpan={4}>
                                <div className="flex flex-col justify-center p-4 font-bold gap-4 place-items-center">
                                    No Tasks Available
                                    <Link to={"/add"}>
                                        <Button color="primary">Add new task</Button>
                                    </Link>
                                </div>
                            </TableCell>
                        </TableRow>
                    }

                    {
                        loading && <TableRow>
                            <TableCell colSpan={4}>
                                <div className="flex flex-col justify-center p-4 font-bold gap-4 place-items-center">
                                    Fetching Tasks...
                                </div>
                            </TableCell>
                        </TableRow>
                    }

                </TableBody>
            </Table>
        </TableContainer>

        <Dialog
            open={openConfirmDelete}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Do you want to delete task?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    By deleting task you will not be able to retrieve it back.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={removeTaskHandler} autoFocus>
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default TaskListPage;