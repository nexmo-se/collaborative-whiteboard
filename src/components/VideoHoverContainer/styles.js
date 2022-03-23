// @flow
import { makeStyles } from '@material-ui/styles';
export default makeStyles(
  () => ({
    layer: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 3,
    },
    hidden: { visibility: 'hidden' },
    root: {
      position: 'absolute',
      bottom: '5%',
      left: '10%',
      transform: 'translate(-50%, 0%)',
      padding: 16,
      borderRadius: 16,
      backgroundColor: 'rgba(20, 20, 20, .7)',
    },
    controlSideBarClosed: {
      left: '50%',
    },
    // chatOpened: {
    //   left: '30%'
    // }
  }),
  { index: 1 }
);
