import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  container: {
    display: 'flex',
    // marginTop: '10vh',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    padding: '5px 15px',
    // overflow: 'hidden',
    width: '70%',

    /* margin-top: 20vh; */
  },
  drawer: {
    display: 'flex',
  },
  messageList: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 80%',
    overflow: 'scroll',
    color: '#fff',
    // maxHeight: '400px',
  },
  chatTitle: {
    position: 'fixed',
    top: 0,
  },
  chatInput: {
    display: 'flex',
    flexDirection: 'row',
    // height: '150px',
  },
}));
