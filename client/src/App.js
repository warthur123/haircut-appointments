import React from "react";
import { Container, AppBar, Typography } from "@mui/material";
import Appointments from "./components/appointmentTable";

import './App.css';


const App = () => {

  return (
    <div className="App">
      <Container maxwidth="lg">
        <AppBar position="static" color="inherit">
          <Typography variant="h2" align="center">Arthur's Haircutting Appointments</Typography>
        </AppBar>

        <Container className="description">
        <Typography variant="h6" align="center">These are the available times that Arthur can give haircuts. Reserve your haircut time slot today!</Typography>
        <Typography variant="h6" align="center">If you face any issues with reserving, feel free to contact at arthurwu382@gmail.com</Typography>
        </Container>


        <Container className="main-content">
          <Appointments />
        </Container>
      </Container>
    </div>
  );
}

export default App;
