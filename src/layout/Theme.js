import { createMuiTheme } from "@material-ui/core/styles";
import { green, orange } from "@material-ui/core/colors";

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: "#fff"
    },
    secondary: {
      main: orange[500],
      contrastText: "#fff"
    },
  },
});

export default Theme
