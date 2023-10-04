import { Modu, ModuOptions } from '@malven/modu';

class Resizer extends Modu {
  constructor(m: ModuOptions) {
    super(m);
  }

  override init() {
    window.addEventListener('resize', this.update);
  }

  update = () => {
    console.log('Window width', window.innerWidth);
  };

  cleanup = () => {
    console.log('Resizer cleanup');
  };
}

export default Resizer;
