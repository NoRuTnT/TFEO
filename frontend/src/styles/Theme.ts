import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#E07068',
      // light: main값을 통해 계산됨
      // dark: main값을 통해 계산됨
      contrastText: '#B7B7B7',
    },
    secondary: {
      main: '#F9EAE1',
    },
  },
});
