import Color from 'color'

export const colours = {
  blue: {
    base: Color('hsl(191, 100%, 60%)'),
    get abyssinian(){return this.base.rotate(8).darken(0.08).round()},
    get badger(){return this.base.rotate(16).darken(0.2).round()},
    get camel(){return this.base.rotate(2).darken(0.2).round()},
    dark: {
      base: Color('hsl(224, 18%, 9%)'),
      get aardvark(){return this.base.rotate(-10).desaturate(0.08).lighten(0.06).round()},
      get baboon(){return this.base.rotate(-6).lighten(0.4).round()},
      get caiman(){return this.base.rotate(-6).desaturate(0.2).lighten(1).round()},
      get dachshund(){return this.base.rotate(-6).desaturate(0.4).lighten(1.6).round()},
      get eagle(){return this.base.rotate(-6).desaturate(0.2).lighten(1.1).round()}
    }
  },
  white: {
    base: Color('#FFFFFF')
  }
}
