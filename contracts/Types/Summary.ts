export default class Summary {
  public title: string
  public current: number
  public previous?: number

  constructor() {
    Object.defineProperty(this, 'diff', {
      enumerable: true,
      get: () => {
        if (!this.previous) return 0
        const decreaseValue = this.current - this.previous
        return (decreaseValue / this.current) * 100
      }
    })
  }
}