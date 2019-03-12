import randomColor from 'randomcolor'

export class Item {
  static generateKey() {
    return btoa(Date.now())
  }

  constructor(content) {
     return {
      id: Item.generateKey(),
      content: content,
      completed: false,
      color: randomColor({ luminosity: 'light' })
    }
  }
}

export default Item
