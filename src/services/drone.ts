import axios from 'axios';

class Drone {
  async getDrone() {
    const drn_usd_data = await axios.get(
      "https://droneapi.mirmglobal.com/token/detail/drone",
      { timeout: 30000 }
    );
    const drn_usd = drn_usd_data.data.data.price;
    const drn_percent = drn_usd_data.data.data.priceRate;
    const brl_data = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=brl",
      { timeout: 30000 }
    );
    const drn_brl = brl_data.data.tether.brl * drn_usd;
    return {
      drn_brl: parseFloat(drn_brl.toString()).toFixed(2),
      drn_usd: parseFloat(drn_usd.toString()).toFixed(2),
      drn_percent: parseFloat(drn_percent).toFixed(2),
    };
  }
}

export default Drone;
