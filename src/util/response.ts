import config from '../config.json';

class Response {
  getResponse(token: string, price_change: string, quantity: number, usd: string, brl: string) {
    const _url = config[token + "_url" as keyof typeof config];
    const _title = config[token + "_name" as keyof typeof config];
    const _img = config[token + "_img" as keyof typeof config];
    const _symbol = config[token + "_symbol" as keyof typeof config];

    const embed = {
      color: 0x00ff00,
      title: _title,
      url: _url,
      thumbnail: {
        url: _img,
      },
      fields: [
        {
          name: `${quantity}x ${_symbol}`,
          value: `24h Price change: ${price_change}%\n:flag_us: $ ${Number(usd) * quantity}\n:flag_br: R$ ${Number(brl) * quantity}`,
        },
      ],
      footer: {
        text: `Made with ❤️ by 0xRnato#5058\nWemix Wallet: 0x98f0fbd41a012565412147724384a805d63652ff`,
        icon_url: config.profile_img,
      },
    };
    return embed;
  }

  getStatus() {

  }
}

export default Response;
