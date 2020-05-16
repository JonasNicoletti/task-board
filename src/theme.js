import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#b794f6'
    },
    secondary: {
      main: '#90ee02',
    },
    background: {
      default: '#121212'
    }
  }
});

export default theme;