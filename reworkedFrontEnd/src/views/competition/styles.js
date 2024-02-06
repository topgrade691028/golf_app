import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginBottom: '20px',
    '& button': {
      marginTop: '20px'
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // minHeight: '100vh',
    padding: theme.spacing(4)
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2)
  },
  golfImage: {
    width: '20%',
    height: 'auto'
  },
  paperContainer: {
    marginTop: theme.spacing(2)
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& h1': {
      margin: '30px 0'
    }
  },
  icon: {
    marginBottom: theme.spacing(1)
  },
  editBtn: {
    margin: '0 10px'
  },
  btnGroup: {
    margin: '0 10px'
  }
}));

export default useStyles;
