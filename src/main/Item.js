import randomColor from 'randomcolor';

export default class Item {
  constructor(id, content) {
    return {
      id: id,
      content: content,
      completed: false,
      color: randomColor({ luminosity: 'light' })
    };
  }
};
