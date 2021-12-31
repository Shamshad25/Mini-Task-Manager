import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Users() {
    const [users, setUsers] = useState([]);

    var config = {
        method: 'get',
        url: 'https://devza.com/tests/tasks/listusers',
        headers: {
            'AuthToken': 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a'
        }
    };
    useEffect(() => {
        axios(config).then((response) => {
            setUsers(response.data.users);
            console.log(response.data.users);
        });
    }, []);

    return (
        <div className="users">
            {console.log("USErS", users)}
            {users?.map((user) => {
                return (
                    <div key={user.id}>
                        <img src={user.picture} alt={user.name}></img>
                        <h1 key={user.id}>{user.name}</h1>
                    </div>
                );
            })}
        </div>
    );
};