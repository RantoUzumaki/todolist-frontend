import React, { useEffect, useState } from "react";
import dashboardStyle from "./dashboard.module.css";
import { NewTask, EditTask } from "../Tasks/Task";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../../api";

export function Dashboard() {
    const [newtask, setnewTask] = useState(false);
    const [edittask, seteditTask] = useState(false);
    const [edittaskdetails, seteditTaskdetails] = useState();
    const [gettask, setGettask] = useState();
    const [delTask, setdelTask] = useState(false);

    useEffect(() => {
        function getTask() {
            setdelTask(false);
            axios
                .get(`${api.url}/get-task-all`, {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": localStorage.getItem("accessToken"),
                    },
                })
                .then((res) => {
                    console.log("res", res.data);
                    !res.data
                        ? toast.info("please add task to view")
                        : toast.info();

                    setGettask(res.data);
                    res.data ? toast.info() : toast.info("Add Task");
                })
                .catch((err) => {
                    console.log(err.response.status);
                    if (err.response.status === 401) {
                        localStorage.removeItem("loginCreds");
                        localStorage.removeItem("accessToken");
                        window.location.href = "/Login";
                    }
                });
        }

        getTask();
    }, [newtask, edittask, delTask]);

    function editTask(e) {
        seteditTaskdetails(e.target.id);
        seteditTask(true);
    }

    function loader() {
        toast.info("Wait for Retriving");
    }

    const deleteTask = (e) => {
        axios
            .delete(`${api.url}/delete-task`, {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("accessToken"),
                },
                data: {
                    id: e.target.id,
                },
            })
            .then((res) => {
                if (res) {
                    setdelTask(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={dashboardStyle.mainContainer}>
            <div className={dashboardStyle.usernameDiv}>
                <p className={dashboardStyle.usernameText}>
                    Hello!&nbsp;
                    <span>
                        {
                            JSON.parse(localStorage.getItem("loginCreds"))
                                .username
                        }
                    </span>
                </p>
                {!newtask ? (
                    <div className={dashboardStyle.CreateTaskDiv}>
                        <button
                            onClick={() => setnewTask(true)}
                            className={dashboardStyle.CreateTask}
                        >
                            <i className="bi bi-plus-square-fill"></i>
                        </button>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
            <div className={dashboardStyle.centeredConatiner}>
                <table className={dashboardStyle.DashboardTable}>
                    <thead className={dashboardStyle.TableHeadMain}>
                        <tr className={dashboardStyle.TableHeadRow}>
                            <th>Tasks</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {gettask ? (
                        <tbody className={dashboardStyle.TableBodyMain}>
                            {gettask.map((data) => (
                                <tr
                                    key={data._id}
                                    id={data._id}
                                    className={dashboardStyle.TableBodyRow}
                                >
                                    <td>{data.task}</td>
                                    <td>
                                        {data.isActive === true
                                            ? "Active"
                                            : "In Active"}
                                    </td>
                                    <td>
                                        <button
                                            onClick={editTask}
                                            className={
                                                dashboardStyle.EditButton
                                            }
                                        >
                                            <i
                                                id={data._id}
                                                className="bi bi-pencil-square"
                                            ></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={deleteTask}
                                            id={data._id}
                                            className={
                                                dashboardStyle.DeleteButton
                                            }
                                        >
                                            <i
                                                id={data._id}
                                                className="bi bi-trash-fill"
                                            ></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        loader()
                    )}
                </table>
            </div>

            {newtask && <NewTask trigger={newtask} setTrigger={setnewTask} />}

            {edittask && (
                <EditTask
                    edittrigger={edittask}
                    seteditTrigger={seteditTask}
                    details={edittaskdetails}
                />
            )}
        </div>
    );
}
