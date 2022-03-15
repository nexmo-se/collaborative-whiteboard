const WhiteBoard = ({ url }) => {
  return (
    <iframe
      className="right"
      title="collaborative board"
      src={url}
      frameBorder="0"
    ></iframe>
  );
};

export default WhiteBoard;
