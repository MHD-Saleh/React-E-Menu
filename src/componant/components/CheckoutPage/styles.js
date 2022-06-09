import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  root: {
    padding: "8px",
    height: "100vh",
    backgroundColor: "#eeeeee",
  },
  paper: {
    margin: "30px",
    padding: "30px",
    width: "70%",
    backgroundColor: "white",
    alignItems: "center",
  },
  card: {
    backgroundColor: "blue",
  },
}));
