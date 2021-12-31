import React, { useState, useEffect } from "react";
import { FaPen, FaTrash } from 'react-icons/fa';
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListTask() {
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [taskId, setTaskId] = useState('');
    const [message, setMessage] = useState('');
    const [assign, setAssign] = useState('');
    const [date, setDate] = useState(null);
    const [priority, setPriority] = useState("1");
    const [users, setUsers] = useState([]);
    const [searchKey, setSearchKey] = useState('');


    useEffect(() => {
        var config = {
            method: 'get',
            url: 'https://devza.com/tests/tasks/listusers',
            headers: {
                'AuthToken': 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a'
            }
        };
        axios(config).then((response) => {
            setUsers(response.data.users);
            console.log(response.data.users);
        });
    }, []);



    var config = {
        method: 'get',
        url: 'https://devza.com/tests/tasks/list',
        headers: {
            'AuthToken': 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a'
        }
    };


    const getAllTask = () => {
        axios(config).then((response) => {
            console.log(response.data.tasks);
            setTasks(response.data.tasks);
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        getAllTask();
    }, []);

    const onEditClick = (task) => {
        setIsEditing(true);
        setTaskId(task.id);
        setMessage(task.message);
        setAssign(task.assigned_to);
        setDate(task.due_date);
        setPriority(task.priority);
    };

    const editItem = (e) => {
        e.preventDefault();
        var FormData = require('form-data');
        var data = new FormData();
        data.append('message', message);
        data.append('due_date', date);
        data.append('priority', priority);
        data.append('assigned_to', assign);
        data.append('taskid', taskId);
        var config = {
            method: 'post',
            url: 'https://devza.com/tests/tasks/update',
            headers: {
                'AuthToken': 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a',
            },
            data: data
        };

        axios(config).then((response) => {
            console.log(response.data);
            getAllTask();
            setIsEditing(false);
        }).catch(function (error) {
            console.log(error);
        });

    };

    const removeItem = (id) => {
        var FormData = require('form-data');
        var data = new FormData();
        data.append('taskid', id);

        var config = {
            method: 'post',
            url: 'https://devza.com/tests/tasks/delete',
            headers: {
                'AuthToken': 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a',
            },
            data: data
        };

        axios(config).then(function (response) {
            console.log(JSON.stringify(response.data));
            getAllTask();
        }).catch(function (error) {
            console.log(error);
        });
    };

    return (
        <div className="task-lists">
            <div className="search-bar">
                <input
                    type='text'
                    placeholder="Search..."
                    value={searchKey}
                    className="search"
                    onChange={(e) => {
                        setSearchKey(e.target.value)
                    }}
                />
            </div>
            {isEditing ?
                <form className="update-assign" onSubmit={editItem}>
                    <article className="article-text">
                        <div>
                            <label>Message :</label>
                            <input
                                type="text"
                                className="message"
                                placeholder="type here.."
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <label>Assigned to:</label>
                            <select className="priority" value={assign} onChange={(e) => {
                                setAssign(e.target.value);
                            }}>
                                {
                                    users?.map((user) => {
                                        return (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                    </article>
                    <article className="article-left">
                        <div>
                            <label>Due Date :</label>

                            <input
                                type="date"
                                className="due-date"
                                value={date?.slice(0, 10)}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <label>Priority :</label>
                            <select className="priority" style={{ marginLeft: 45 }} value={priority} onChange={(e) => {
                                setPriority(e.target.value);
                            }}>
                                <option value="1">Normal</option>
                                <option value="2">Low</option>
                                <option value="3">High</option>
                            </select>
                        </div>
                    </article>
                    <button type="submit" className="btn">Update Task</button>
                </form>
                :
                <div className="create-tab">
                    <Link to='/create' className="create-btn">Create Task</Link>
                </div>
            }


            {
                tasks.filter(item => {
                    console.log(item.assigned_name.toUpperCase());
                    console.log(`${searchKey.length > 1 ? searchKey[0]?.toUpperCase() : ""}${searchKey.length > 1 ? searchKey.toUpperCase()?.slice(1) : ""}`);
                    return item.assigned_name.toUpperCase().includes(`${searchKey.length > 1 ? searchKey[0]?.toUpperCase() : ""}${searchKey.length > 1 ? searchKey.toUpperCase()?.slice(1) : ""}`)
                }).sort((a, b) => b.priority - a.priority).map((task) => {
                    const { assigned_name, created_on, due_date, message, priority, id } = task;

                    return (
                        <article className="task" key={id}>

                            <div className="assigned">
                                <p>Assigned to:</p>
                                <h4>{assigned_name}</h4>
                            </div>

                            <div className="message-box">
                                <h4>{message}</h4>
                                <h4>Priority : {priority}</h4>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p>Created on: {created_on}</p>
                                    <p>Due date: {due_date}</p>
                                </div>

                            </div>
                            <div className='btn-container'>
                                <div>
                                    <button
                                        type='button'
                                        className='edit-btn'
                                        onClick={() => onEditClick(task)}
                                    >
                                        <FaPen size={16} /> <span>Edit</span>
                                    </button>
                                </div>

                                <button
                                    type='button'
                                    className='delete-btn'
                                    onClick={() => removeItem(id)}
                                >
                                    <FaTrash size={16} />Delete
                                </button>
                            </div>
                        </article>
                    );

                })
            }
        </div>
    );
};