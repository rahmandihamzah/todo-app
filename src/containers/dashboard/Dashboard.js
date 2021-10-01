import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getInitialData, updateData } from "../../store/action-reducers";
import { makeStyles } from "@material-ui/styles";
import SideBar from "../../components/sideBar/SideBar";
import Board from "../../components/board/Board";
import Card from "../../components/card/Card";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

const Dashboard = ({ initialData, data, getInitialData }) => {
  const [openDetail, setOpenDetail] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [isOnEdit, setIsOnEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isAddData, setIsAddData] = useState(false);
  const [addDataTitle, setAddDataTitle] = useState("");
  const [addDataDescription, setAddDataDescription] = useState("");

  useEffect(() => {
    getInitialData();
  }, []);

  const toggleDetailModal = (data) => {
    if (openDetail) {
      setOpenDetail(false);
      setIsOnEdit(false);
    } else {
      setOpenDetail(true);
      setDetailData(data);
    }
  };

  const updateStatusData = (id, status, isEdit = false) => {
    let dataToUpdate = data;
    let itemToUpdate = {};
    const index = dataToUpdate.indexOf(
      dataToUpdate.find((element) => element.id === id)
    );
    if (index !== -1) {
      if (isEdit) {
        itemToUpdate = dataToUpdate[index];
        if (editedTitle) {
          itemToUpdate = { ...itemToUpdate, title: editedTitle };
        }
        if (editedDescription) {
          itemToUpdate = {
            ...itemToUpdate,
            description: editedDescription,
          };
        }
        dataToUpdate[index] = itemToUpdate;
      } else {
        itemToUpdate = { ...dataToUpdate[index], status };
        dataToUpdate[index] = itemToUpdate;
      }
      updateData(dataToUpdate);
      setEditedTitle("");
      setEditedDescription("");
      toggleDetailModal();
    }
  };

  const deleteData = (id) => {
    let dataToUpdate = data;
    const index = dataToUpdate.indexOf(
      dataToUpdate.find((element) => element.id === id)
    );
    if (index !== -1) {
      dataToUpdate.splice(index, 1);
      updateData(dataToUpdate);
      toggleDetailModal();
    }
  };

  const addData = () => {
    let dataToUpdate = data;
    const newData = {
      id: dataToUpdate[dataToUpdate.length - 1].id + 1,
      title: addDataTitle,
      description: addDataDescription,
      status: 0,
      createdAt: new Date(),
    };
    dataToUpdate.push(newData);
    updateData(dataToUpdate);
    setIsAddData(false);
  };

  const useStyles = makeStyles(() => ({
    main: {
      width: "100vw",
      height: "100vh",
      margin: 0,
      padding: 0,
      display: "flex",
    },
    todoContainer: {
      width: "80%",
      height: "100%",
      backgroundColor: "#F1F7E7",
      paddingRight: 30,
      paddingLeft: 30,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    detailModalContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    detailModal: {
      width: 400,
      backgroundColor: "#ffffff",
      padding: 20,
      borderRadius: 10,
    },
    modalTitle: {
      padding: 10,
      display: "flex",
      justifyContent: "center",
      fontWeight: "bold",
    },
    modalDescription: {
      padding: 10,
    },
    modalButton: {
      marginBottom: 10,
      marginTop: 20,
      marginRight: 5,
    },
  }));

  const classes = useStyles();

  const renderCardItems = (status) => {
    if (data.length) {
      let dataToShow = data.filter((item) => item.status === status);

      if (status === 0) {
        dataToShow = dataToShow.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      } else {
        dataToShow = dataToShow.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }

      return (
        <>
          {dataToShow.length &&
            dataToShow.map((item, idx) => {
              if (item.status === status) {
                return (
                  <Card key={idx} data={item} onPress={toggleDetailModal} />
                );
              }
            })}
        </>
      );
    }
  };

  return (
    <div className={classes.main}>
      <SideBar />
      <div className={classes.todoContainer}>
        <Board
          title="To do"
          todoItems={renderCardItems(0)}
          setIsAddData={setIsAddData}
        />
        <Board title="Completed" todoItems={renderCardItems(1)} />
      </div>
      <Modal
        open={openDetail}
        className={classes.detailModalContainer}
        onClose={toggleDetailModal}
      >
        <div className={classes.detailModal}>
          {isOnEdit ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <FormControl>
                <FormControl style={{ width: 400, marginBottom: 20 }}>
                  <label style={{ marginBottom: 5, fontWeight: "bold" }}>
                    Title:{" "}
                  </label>
                  <TextField
                    defaultValue={detailData?.title}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <label style={{ marginBottom: 5, fontWeight: "bold" }}>
                    Description:{" "}
                  </label>
                  <TextField
                    defaultValue={detailData?.description}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                </FormControl>
              </FormControl>
              <Button
                className={classes.modalButton}
                onClick={() => updateStatusData(detailData?.id, 1, true)}
              >
                <span style={{ color: "green" }}>Save</span>
              </Button>
              <Button
                className={classes.modalButton}
                onClick={() => setIsOnEdit(false)}
              >
                <span style={{ color: "red" }}>Cancel</span>
              </Button>
            </div>
          ) : (
            <>
              <span className={classes.modalTitle}>{detailData?.title}</span>
              <span className={classes.modalDescription}>
                {detailData?.description}
              </span>
              <div>
                <Button
                  className={classes.modalButton}
                  onClick={() => setIsOnEdit(true)}
                >
                  <span style={{ color: "green" }}>Edit</span>
                </Button>
                {detailData?.status === 0 && (
                  <>
                    <Button
                      className={classes.modalButton}
                      onClick={() => updateStatusData(detailData?.id, 1)}
                    >
                      <span style={{ color: "blue" }}>Complete</span>
                    </Button>
                    <Button
                      className={classes.modalButton}
                      onClick={() => deleteData(detailData?.id)}
                    >
                      <span style={{ color: "red" }}>Delete</span>
                    </Button>
                  </>
                )}
                {detailData?.status === 1 && (
                  <>
                    <Button
                      className={classes.modalButton}
                      onClick={() => updateStatusData(detailData?.id, 0)}
                    >
                      <span style={{ color: "blue" }}>Move to "To do"</span>
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </Modal>
      <Modal
        open={isAddData}
        className={classes.detailModalContainer}
        onClose={() => setIsAddData(false)}
      >
        <div className={classes.detailModal}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FormControl>
              <FormControl style={{ width: 400, marginBottom: 20 }}>
                <label style={{ marginBottom: 5, fontWeight: "bold" }}>
                  Title:{" "}
                </label>
                <TextField onChange={(e) => setAddDataTitle(e.target.value)} />
              </FormControl>
              <FormControl>
                <label style={{ marginBottom: 5, fontWeight: "bold" }}>
                  Description:{" "}
                </label>
                <TextField
                  onChange={(e) => setAddDataDescription(e.target.value)}
                />
              </FormControl>
            </FormControl>
            <Button
              className={classes.modalButton}
              onClick={addData}
              disabled={!addDataTitle || !addDataDescription}
            >
              <span style={{ color: "green" }}>Add Todo</span>
            </Button>
            <Button
              className={classes.modalButton}
              onClick={() => setIsAddData(false)}
            >
              <span style={{ color: "red" }}>Cancel</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    initialData: state.todoReducers.initialData,
    data: state.todoReducers.data,
  };
};

export default connect(mapStateToProps, {
  getInitialData,
  updateData,
})(Dashboard);
