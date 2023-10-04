import { Modu, ModuOptions } from '@malven/modu';

class Scroller extends Modu {
  constructor(m: ModuOptions) {
    super(m);
  }

  override init() {
    window.addEventListener('scroll', this.update);
  }

  update = () => {
    console.log('Window scroll', window.scrollY);
  };

  cleanup = () => {
    console.log('Scroller cleanup');
  };
}

export default Scroller;
