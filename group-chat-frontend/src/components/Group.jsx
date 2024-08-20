import React, { useState } from "react";
import {
  Box,
  FormControl,
  Input,
  InputLabel,
  Modal,
  Typography,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];

function Group({ handleClose, open }) {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
            Create/Update Group
          </Typography>
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="group-name" sx={{ ml: -2 }}>
              Group Name
            </InputLabel>
            <Input
              id="group-name"
              aria-describedby="group-name-helper-text"
              required={true}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            {" "}
            <Autocomplete
              multiple
              id="tags-outlined"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              defaultValue={[]}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Users"
                  placeholder="Users"
                />
              )}
            />
          </FormControl>
          <br />
          <br />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Done
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Group;
