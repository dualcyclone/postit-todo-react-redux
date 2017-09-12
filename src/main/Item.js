import randomColor from 'randomcolor';

const Item = (id, content) => {
  return {
    id: id,
    content: content,
    completed: false,
    color: randomColor({ luminosity: 'light' })
  };
};

export default Item;
