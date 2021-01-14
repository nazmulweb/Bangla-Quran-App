import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const loading = {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
}

export default function Loading() {
  const classes = useStyles();

  return (
    <div className="loading" style={loading}>
        <div className={classes.root}>
        <CircularProgress />
        </div>
    </div>
  );
}