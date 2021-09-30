import { makeStyles } from "@material-ui/styles";

const SideBar = () => {
  const useStyles = makeStyles(() => ({
    container: {
      width: "20%",
      height: "100%",
    },
  }));

  const classes = useStyles();

  return <div className={classes.container}></div>;
};

export default SideBar;
