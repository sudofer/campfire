import { createTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import { blueGrey } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: blueGrey[900],
    },
  },
});

export default theme;
