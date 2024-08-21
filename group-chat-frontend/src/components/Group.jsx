import React, { useState, useEffect } from "react";
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
import axiosInstance from "../axiosInstance";
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

const createGroup = async (name) => {
  try {
    let response = await axiosInstance.post("/groups/new", {
      name: name,
    });
    console.log(response.data);
    return response?.data?.id;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const handleGroup = async (newData, data) => {
  try {
    let id = (data && data?.id) || (await createGroup(newData.name));

    if (typeof id == "string") {
      let response = await axiosInstance.post(`/groups/${id}`, {
        updateData: {
          name: newData.name,
          users: newData?.users?.map((e) => e.id),
        },
      });
      console.log(response.data);
    }
  } catch (err) {
    console.log(err);
  }
};

function Group({ handleClose, open, data }) {
  const [name, setName] = useState((data && data.name) || "");
  const [users, setUsers] = useState((data && data.users) || []);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosInstance.get("/groups");
        console.log(response.data);
        setAllUsers(() =>
          response?.data?.map((e) => ({
            username: e.username,
            id: e._id,
          }))
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
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
            if (users.length != 0) {
              handleGroup({ name, users }, data);
            }
            console.log(e);
            handleClose();
            setName("");
            setUsers([]);
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
              options={allUsers}
              getOptionLabel={(option) => option?.username}
              value={users}
              onChange={(e, newVal) => {
                setUsers(newVal);
              }}
              filterSelectedOptions
              isOptionEqualToValue={(option, value) => option.id === value.id}
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
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={users.length == 0}
          >
            Done
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Group;
