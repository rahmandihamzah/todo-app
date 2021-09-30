import { makeStyles } from "@material-ui/styles";

const Card = ({ data, onPress }) => {
  const useStyles = makeStyles(() => ({
    container: {
      width: "100%",
      height: 100,
      backgroundColor: "#ffffff",
      borderRadius: 10,
      marginBottom: 10,
    },
    title: {
      padding: 10,
      display: "flex",
      justifyContent: "center",
      fontWeight: "bold",
    },
    description: {
      padding: 10,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.container} onClick={() => onPress(data)}>
      <div className={classes.title}>
        <span>{data.title}</span>
      </div>
      <div className={classes.description}>{data.description}</div>
    </div>
  );
};

export default Card;
