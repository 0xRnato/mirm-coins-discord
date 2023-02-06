import axios from 'axios';

class Dogma {
  async getDogma() {
    const dog_usd_data = await axios.get(
      "https://droneapi.mirmglobal.com/token/detail/dogma",
      { timeout: 30000 }
    );
    const dog_usd = dog_usd_data.data.data.price;
    const dog_percent = dog_usd_data.data.data.priceRate;
    const brl_data = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=brl",
      { timeout: 30000 }
    );
    const dog_brl = brl_data.data.tether.brl * dog_usd;
    return {
      dog_brl: parseFloat(dog_brl.toString()).toFixed(2),
      dog_usd: parseFloat(dog_usd.toString()).toFixed(2),
      dog_percent: parseFloat(dog_percent).toFixed(2),
    };
  }
}

export default Dogma;
