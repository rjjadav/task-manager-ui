import axios from "axios";
import { Alert, Button, Card, CardContent, FormControl, FormHelperText, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { tasksActions } from "../../store/task/task.slice";


const BASE_URL = process.env.REACT_APP_BASE_URL;

const TaskDetails = (props) => {
    const { control, handleSubmit, setValue } = useForm({ mode: "all"});
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const dispatch = useDispatch()

    
    const addTask = (task) => {
        axios.post(`${BASE_URL}tasks`, task).then(response => {
            dispatch(tasksActions.addTask({task: response.data}))
            setAlertMessage("Task saved successfully");
            setAlertType("success");
            setShowAlert(true);
        }).catch(e => {
            setAlertMessage("Error while saving Task");
            setAlertType("error");
            setShowAlert(true);
        })

    }

    const editTask = (task) => {
        axios.put(`${BASE_URL}tasks/${props.id}`, task).then(response => {
            dispatch(tasksActions.updateTask({task: response.data}))
            setAlertMessage("Task updated successfully");
            setAlertType("success");
            setShowAlert(true);
        }).catch(e => {
            setAlertMessage("Error while updating Task");
            setAlertType("error");
            setShowAlert(true);
        })
    }
    
    const saveTask = (e) => {
        if(props.edit) {
            editTask(e);
        } else {
            addTask(e);
        }

    }




    const getTaskDetails = () => {}


    const handleClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setShowAlert(false);
      };

    useEffect(() => {
        if(props.edit) {
            setValue("title", props.taskDetails?.title);
            setValue("description", props.taskDetails?.description);
            setValue("status", props.taskDetails?.status);

        }
    })

    return <>
        <div className="flex justify-between  px-4 pb-4 content-center">
            <Typography variant="h6" gutterBottom>
                {props.edit ? "Edit Task" : "New Task"}
            </Typography>

            {/* <Link to="/add">
                <Button variant="outlined" startIcon={<Add />} size="small">New Task</Button>
            </Link> */}
        </div>
        <Card>
            <CardContent>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(saveTask)}>
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "This field is required"
                            }
                        }}
                        defaultValue={props.taskDetails ? props.taskDetails.title : ""}
                        render={({ field, fieldState: { error } }) => {
                        return <TextField {...field}
                            helperText={error ? error.message : ""}
                            error={!!error}
                            fullWidth
                            label="Title"
                            type="text"
                            size="small"
                            // value={props.taskDetails ? props.taskDetails.title : ""}
                        />}}
                    />

                    <Controller
                        name="description"
                        control={control}
                        defaultValue={props.taskDetails ? props.taskDetails.description : ""}
                        render={({ field, fieldState: { error } }) => <TextField {...field}
                            helperText={error ? error.message : ""}
                            error={!!error}
                            fullWidth
                            label="Description"
                            type="text"
                            size="small"
                            multiline
                            rows={3}
                            // value={props.taskDetails ? props.taskDetails.description : ""}
                        />}
                    />

                    <Controller
                        name="status"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Please select status"
                            }
                        }}
                        defaultValue={props.taskDetails ? props.taskDetails.status : ""}
                        render={({ field, fieldState: { error } }) => <FormControl size="small" error={!!error}>
                            <InputLabel>Select Status</InputLabel>
                        
                            <Select label="Select status" {...field}>
                                <MenuItem value={"pending"}>Pending</MenuItem>
                                <MenuItem value={"in_progress"}>In Progress</MenuItem>
                                <MenuItem value={"done"}>Done</MenuItem>
                            </Select>
                            <FormHelperText>{error ? error.message : ""}</FormHelperText>
                        </FormControl>}
                    />

                    <div className="flex justify-end gap-4">
                        <Button color="primary" variant="contained" type="submit">Submit</Button>
                    </div>
                </form>
            </CardContent>
        </Card>

        <Snackbar open={showAlert} autoHideDuration={5000} onClose={handleClose}>
            <Alert severity={alertType || 'success'} sx={{ width: '100%' }} variant="filled" onClose={handleClose}>
                {alertMessage}
            </Alert>
        </Snackbar>
    </>
}

export default TaskDetails;