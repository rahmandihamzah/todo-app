import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const Board = ({ title, todoItems, setIsAddData }) => {
  const useStyles = makeStyles(() => ({
    container: {
      width: "30%",
      height: "80%",
      backgroundColor: "#BFD8B8",
      borderRadius: 20,
      display: "flex",
      flexDirection: "column",
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
      paddingBottom: 20,
    },
    titleWrapper: {
      width: "100%",
      fontWeight: "bold",
      paddingTop: 5,
      paddingBottom: 5,
      marginBottom: 20,
    },
    cardWrapper: {
      width: "100%",
    },
    buttonAdd: {
      marginBottom: 20,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.titleWrapper}>{title}</div>
      {title === "To do" && (
        <Button
          className={classes.buttonAdd}
          onClick={() => setIsAddData(true)}
        >
          <AddIcon />
        </Button>
      )}
      <div className={classes.cardWrapper}>{todoItems}</div>
    </div>
  );
};

export default Board;
