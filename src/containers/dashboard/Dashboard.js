import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getInitialData, updateData } from "../../store/action-reducers";
import { makeStyles } from "@material-ui/styles";
import SideBar from "../../components/sideBar/SideBar";
import Board from "../../components/board/Board";
import Card from "../../components/card/Card";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

const Dashboard = ({ initialData, data, getInitialData }) => {
  const [openDetail, setOpenDetail] = useState(false);
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    getInitialData();
  }, []);

  useEffect(() => {}, []);

  const toggleDetailModal = (data) => {
    if (openDetail) {
      setOpenDetail(false);
    } else {
      setOpenDetail(true);
      setDetailData(data);
    }
  };

  const updateStatusData = (id, status) => {
    let dataToUpdate = data;
    let itemToUpdate = {};
    const index = dataToUpdate.indexOf(
      dataToUpdate.find((element) => element.id === id)
    );
    if (index !== -1) {
      itemToUpdate = { ...dataToUpdate[index], status };
      dataToUpdate[index] = itemToUpdate;
      updateData(dataToUpdate);
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
    return (
      <>
        {data.length &&
          data?.map((item, idx) => {
            if (item.status === status) {
              return <Card key={idx} data={item} onPress={toggleDetailModal} />;
            }
          })}
      </>
    );
  };

  return (
    <div className={classes.main}>
      <SideBar />
      <div className={classes.todoContainer}>
        <Board title="To do" todoItems={renderCardItems(0)} />
        <Board title="Completed" todoItems={renderCardItems(1)} />
      </div>
      <Modal
        open={openDetail}
        className={classes.detailModalContainer}
        onClose={toggleDetailModal}
      >
        <div className={classes.detailModal}>
          <span className={classes.modalTitle}>{detailData?.title}</span>
          <span className={classes.modalDescription}>
            {detailData?.description}
          </span>
          <div>
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
