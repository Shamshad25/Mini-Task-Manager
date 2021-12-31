import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaChevronCircleLeft, } from "react-icons/fa";

export default function Create() {
    const [message, setMessage] = useState('');
    const [assign, setAssign] = useState('');
    const [date, setDate] = useState(null);
    const [priority, setPriority] = useState("1");
    const [users, setUsers] = useState([]);
    const navigator = useNavigate();


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

    var FormData = require('form-data');
    var data = new FormData();

    var config = {
        method: 'post',
        url: 'https://devza.com/tests/tasks/create',
        headers: {
            'AuthToken': 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a',
        },
        data: data
    };

    const createTask = (e) => {
        e.preventDefault();
        data.append('message', message);
        data.append('due_date', date);
        data.append('priority', priority);
        data.append('assigned_to', assign);
        axios(config).then((response) => {

            navigator('/')
            console.log(response.data);
        });
    };


    return (
        <div className="create-task">

            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <h3> Create Task </h3>
                <div>
                    <button
                        type='button'
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', backgroundColor: 'transparent' }}
                        onClick={() => { navigator('/') }}
                    >
                        <FaChevronCircleLeft size={25} /><span style={{ paddingLeft: 6, fontSize: 14 }}>Back</span>
                    </button>
                </div>
            </div>
            <form onSubmit={createTask}>
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
                            value={date} onChange={(e) => {
                                setDate(e.target.value);
                                console.log("Selected Date", e.target.value);
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
                <button type="submit" className="btn"> Create Task</button>
            </form>
        </div>
    );
};