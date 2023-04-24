import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    gap: "10pX",
  },
}));

export default function SimpleModal({ open, setOpen }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [isError, setIsError] = useState(false);
  const [isExist, setIsExiste] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setIsError(false);
    fetch(
      "https://3001-irenecervill-ladybikers-ztsotawghti.ws-eu95.gitpod.io/api/existuser",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          return setIsError(true);
        }

        setIsExiste(true);
      });
  };

  const changePaswword = (e) => {
    e.preventDefault();

    const repeatPassword = e.target.confirmPassword.value;

    if (repeatPassword !== password) {
      setIsError(true);
    }

    fetch(
      "https://3001-irenecervill-ladybikers-ztsotawghti.ws-eu95.gitpod.io/api/changepassword",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
            setOpen(false)
        }
        console.log(data);
      });

    console.log(password, repeatPassword);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {isError && <Alert severity="error">El usuario no existe</Alert>}
      {isExist && <Alert severity="success">Ingresa tu nueva contraseña</Alert>}
      <h2 id="simple-modal-title">Recuperar Contraseña</h2>
      <p id="simple-modal-description">
        Por favor ingresa tu correo para poder recuperar tu contraseña.
      </p>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <TextField
          style={{ width: "100%" }}
          id="outlined-basic"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Correo Electronico"
          variant="outlined"
          type="email"
          name="email"
        />
        <Button type="submit" variant="contained" color="primary">
          Recuperar
        </Button>
      </form>
    </div>
  );

  const recoveryPassword = (
    <div style={modalStyle} className={classes.paper}>
      {isError && <Alert severity="error">Las contraseñas no coinciden</Alert>}
      {isExist && <Alert severity="success">Ingresa tu nueva contraseña</Alert>}
      <h2 id="simple-modal-title">Recuperar Contraseña</h2>
      <p id="simple-modal-description">
        Por favor ingresa la contraseña nueva que deseas utilizar.
      </p>
      <form
        onSubmit={changePaswword}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <TextField
          style={{ width: "100%" }}
          id="outlined-basic"
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          type="password"
          name="password"
        />
        <TextField
          style={{ width: "100%" }}
          id="outlined-basic"
          label="Repetir Contraseña"
          variant="outlined"
          type="password"
          name="confirmPassword"
        />
        <Button type="submit" variant="contained" color="primary">
          Recuperar
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {isExist ? recoveryPassword : body}
      </Modal>
    </div>
  );
}
