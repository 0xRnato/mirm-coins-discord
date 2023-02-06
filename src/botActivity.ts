import Drone from './services/drone';
import Dogma from './services/dogma';

const droneService = new Drone();
const dogmaService = new Dogma();

class Status {
  arrayOfStatus: string[];
  index: number;
  constructor() {
    this.arrayOfStatus = [];
    this.index = 0;
  }

  async updateArray() {
    try {
      const { drn_brl, drn_usd, drn_percent } =
        await droneService.getDrone();
      const { dog_brl, dog_usd, dog_percent } =
        await dogmaService.getDogma();
      this.arrayOfStatus = [
        "!help",
        `DRN $ ${drn_usd} | ${drn_percent}%`,
        `DRN R$ ${drn_brl} | ${drn_percent}%`,
        `DOG $ ${dog_usd} | ${dog_percent}%`,
        `DOG R$ ${dog_brl} | ${dog_percent}%`,
      ];
    } catch (error) {
      console.log(error);
    }
    return;
  }

  getStatus() {
    if (this.index === this.arrayOfStatus.length) this.index = 0;
    else this.index++;
    return this.arrayOfStatus[this.index];
  }
}

export default Status;
