import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../../api";
import taskStyle from "./task.module.css";

export function NewTask(props) {
    function TaskCheckbox() {
        if (document.getElementById("taskActive").checked) {
            document.getElementById("activeText").innerHTML = "Active";
        } else {
            document.getElementById("activeText").innerHTML = "In-Active";
        }
    }

    function createtask() {
        const data = {
            task: document.getElementById("taskinput").value,
            isActive: document.getElementById("taskActive").checked
                ? true
                : false,
        };

        axios
            .post(`${api.url}/add-task`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": JSON.parse(
                        localStorage.getItem("loginCreds")
                    ).accessToken,
                },
            })
            .then((res) => {
                if (res.data.message === "Task added successfully!") {
                    toast.success("Task added Successfully");
                    document.getElementById("taskinput").value = "";
                    document.getElementById("taskActive").checked = false;
                    document.getElementById("activeText").innerHTML =
                        "In-Active";
                    props.setTrigger(false);
                }
            })
            .catch((err) => console.log(err));
    }

    return props.trigger ? (
        <div className={taskStyle.mainContainer}>
            <div className={taskStyle.centeredContainer}>
                <div className={taskStyle.centeredDiv}>
                    {/* <div className={taskStyle.closeDiv}> */}
                    <p className={taskStyle.taskTitle}>Task</p>
                    <button
                        onClick={() => props.setTrigger(false)}
                        className={taskStyle.closeBtn}
                    >
                        <i className="bi bi-x-square-fill"></i>
                    </button>
                    {/* </div> */}
                    <div className={taskStyle.sepDiv}></div>
                    <input
						autoFocus
                        type="text"
                        id="taskinput"
                        className={taskStyle.input}
                        placeholder="Task..."
                    />
                    <div className={taskStyle.activeDiv}>
                        <input
                            onClick={TaskCheckbox}
                            type="checkbox"
                            name="Task.Active"
                            id="taskActive"
                            className={taskStyle.activeCheck}
                        />
                        <p id="activeText" className={taskStyle.activeText}>
                            In-Active
                        </p>
                    </div>
                    <button onClick={createtask} className={taskStyle.Button}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
}

export function EditTask(props) {
	console.log(props)
    const [getEdit, setGetedit] = useState([]);

    useEffect(() => {
        if (props.details) {
            axios
                .get(`${api.url}/get-task/${props.details}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": localStorage.getItem("accessToken"),
                    },
                })
                .then((res) => {
					console.log(res.data[0])
                    setGetedit(res.data[0]);
					document.getElementById("taskActive").checked =
                        res.data[0].isActive? true : false
                });
        }
    }, [props.details]);

    function TaskCheckbox() {
        if (document.getElementById("taskActive").checked) {
            document.getElementById("activeTextId").innerHTML = "Active";
        } else {
            document.getElementById("activeTextId").innerHTML = "In-Active";
        }
    }

    function EditTask() {
        let Editdata = {
            taskId: props.details,
            task: document.getElementById("taskinput").value,
            isActive: document.getElementById("taskActive").checked
                ? true
                : false,
        };

        axios
            .put(`${api.url}/update-task`, Editdata, {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                console.log(res);
                if (res.data.message === "Task Updated") {
                    toast.success("Task updated Successfully");
                    props.seteditTrigger(false);
                }
            })
            .catch((err) => console.log(err));
    }

    return props.edittrigger ? (
        <div className={taskStyle.mainContainer}>
            <div className={taskStyle.centeredContainer}>
                <div className={taskStyle.centeredDiv}>
                    <div className={taskStyle.closeDiv}>
                        <p className={taskStyle.taskTitle}>Edit Task</p>
                        <button
                            onClick={() => props.seteditTrigger(false)}
                            className={taskStyle.closeBtn}
                        >
                            <i className="bi bi-x-square-fill"></i>
                        </button>
                    </div>
                    <div className={taskStyle.sepDiv}></div>
                    <input
                        type="text"
                        id="taskinput"
                        className={taskStyle.input}
                        defaultValue={getEdit ? getEdit.task : ""}
                    />
                    <div className={taskStyle.activeDiv}>
                        <input
                            onClick={TaskCheckbox}
                            type="checkbox"
                            name="Task-Active"
                            id="taskActive"
                            className={taskStyle.activeCheck}
                        />
                        <p id="activeTextId" className={taskStyle.activeText}>
                            {getEdit.isActive ? "Active" : "In-Active"}
                        </p>
                    </div>
                    <button onClick={EditTask} className={taskStyle.Button}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
}
