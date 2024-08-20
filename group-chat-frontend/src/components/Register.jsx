import React, { useState } from "react";
import {
  Box,
  FormControl,
  Input,
  InputLabel,
  Modal,
  Typography,
  Button,
} from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Register({ handleClose, open }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            SubmitJob(name, duration);
            handleClose();
            setName("");
            setPassword("");
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create User
          </Typography>
          <br />
          <FormControl>
            <InputLabel htmlFor="user-name" sx={{ ml: -2 }}>
              User Name
            </InputLabel>
            <Input
              id="user-name"
              aria-describedby="user-name-helper-text"
              fullWidth
              required={true}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormControl>
          <br />
          <br />
          <FormControl>
            <InputLabel htmlFor="user-password" sx={{ ml: -2 }}>
              Password
            </InputLabel>
            <Input
              id="user-password"
              aria-describedby="user-password-helper-text"
              fullWidth
              type="password"
              required={true}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </FormControl>
          <br />
          <br />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Register;
