import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const WhiteBoard = ({ url }) => {
  return (
    <iframe
      className="right"
      title="collaborative board"
      src={url}
      frameBorder="0"
      // style={{ zoom: 0.75 }}
    ></iframe>
  );
};

export default WhiteBoard;
