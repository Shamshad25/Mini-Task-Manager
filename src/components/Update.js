import React, { useState, useEffect } from "react";
import axios from "axios";
import Create from "./Create";

export default function Update() {
    const [update, setUpdate] = useState([]);


    const updateTask = () => {

    }

    useEffect(() => {
        updateTask();
    }, []);
    return (
        <h3>setup</h3>
    );
};