import React from "react";
import { TableCell, TableRow, Button, Input, Box, Modal } from "@mui/material"
import emailjs from '@emailjs/browser';

const Appointment = props => {
    const ariaLabel = { 'aria-label': 'description' };
    const [open, setOpen] = React.useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        p: 4,
    };

    /* open and close appointment registration form */
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /* handle reserve button enabled or disabled */
    const checkReserve = (claimed) => {
        if (!claimed) {
            return <Button variant="contained" onClick={handleOpen}>Reserve</Button>
        } else {
            return <Button variant="contained" disabled onClick={handleOpen}>Reserved</Button>
        }
    }

    /* handle submit */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('name-field').value;
        const email = document.getElementById('email-field').value;
        try {
            const body = { 'id': props.id, 'name': name, 'email': email };
            const response = await fetch(`/reserve/${props.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            const templateParams = {
                name: name,
                time: props.time,
                date: props.date,
                to_email: email
            };
            await emailjs.send(process.env.SERVICE_ID, process.env.TEMPLATE_ID, templateParams, process.env.USER_ID)
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            console.log(response.body);
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
        setOpen(false);
    };


    return (
        <TableRow key={props.date}>
            <TableCell align="center" component="th" scope="row">{props.date}</TableCell>
            <TableCell align="center">{props.time}</TableCell>
            <TableCell align="center">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Input placeholder="Name" id="name-field" inputProps={ariaLabel} />
                        <Input placeholder="Email" id="email-field" inputProps={ariaLabel} />
                        <Button onClick={handleSubmit}>Submit</Button>
                    </Box>
                </Modal>

                {checkReserve(props.claimed)}
            </TableCell>
        </TableRow>
    );
}

export default Appointment;