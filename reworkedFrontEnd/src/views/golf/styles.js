import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  scoreInput: {
    [theme.breakpoints.down('sm')]: {
      width: '30px',
    }
  }
}));

export default useStyles;
