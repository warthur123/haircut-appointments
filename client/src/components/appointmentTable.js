import React, { useEffect, useState } from "react";
import Appointment from "./appointment";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Appointments = props => {
    const [appointments, setAppointments] = useState([]);


    /* get all appointments to show */
    const getAllAppointments = async () => {
        try {
            const response = await fetch("http://localhost:8000/all");
            const jsonData = await response.json();
            setAppointments(jsonData);
        } catch (error) {
            console.error(error);
        }
    }

    /* convert date entry to correct format */
    const convertDate = (date) => {
        return date.substring(0, 10);
    }

    /* convert time entry to correct format */
    const convertTime = (time) => {
        let toReturn = time.substring(0, time.length - 3);
        if (parseInt(toReturn.substring(0,2)) > 12) {
        } else {
            return toReturn + " AM";
        }
        return toReturn;
    }

    
    useEffect(() => {
        getAllAppointments();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Time</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {appointments.map((appointment) => (
                        <Appointment id={appointment.id} date={convertDate(appointment.apt_date)} time={convertTime(appointment.apt_time)} claimed={appointment.claimed} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Appointments;