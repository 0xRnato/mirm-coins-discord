import Discord from 'discord.js';
import cron from 'node-cron';

import config from './config.json'
import Response from './util/response';
import Drone from './services/drone';
import Dogma from './services/dogma';

import Status from './botActivity';

const droneService = new Drone();
const dogmaService = new Dogma();
const status = new Status();

const _response = new Response();
const client = new Discord.Client({ intents: ["Guilds", "GuildMessages", "MessageContent"] });
const prefix = "!";

const updateStatusJob = cron.schedule("* * * * *", () => {
  console.log("updating array");
  status.updateArray();
});

client.on("ready", () => {
  console.log([`Logged as ${client?.user?.tag}`].join("\n"));
  console.log("updating array");
  status.updateArray();
  updateStatusJob.start();
  setInterval(() => {
    console.log("updating status");
    const _status = status.getStatus();
    client?.user?.setActivity(_status);
  }, 10000);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args?.shift()?.toLowerCase();

  let response = {
    color: 0,
    title: "",
    url: '',
    thumbnail: {
      url: "",
    },
    fields: [
      {
        name: "",
        value: "",
      },
    ],
    footer: {
      text: '',
      icon_url: '',
    },
  };
  switch (command) {
    case "drn":
    case "drone":
      const { drn_brl, drn_usd, drn_percent } =
        await droneService.getDrone();
      response = _response.getResponse(
        "drn",
        drn_percent,
        Number(args[0]) || 1,
        drn_usd,
        drn_brl,
      );
      break;
    case "dog":
    case "dogma":
      const { dog_brl, dog_usd, dog_percent } =
        await dogmaService.getDogma();
      response = _response.getResponse(
        "dog",
        dog_percent,
        Number(args[0]) || 1,
        dog_usd,
        dog_brl,
      );
      break;
    case "help":
      const embed = {
        color: 0xff0000,
        title: "MirM Tokens",
        url: '',
        thumbnail: {
          url: "https://file.mirmglobal.com/forum/images/logo.png",
        },
        fields: [
          {
            name: "Drone",
            value: "!drn or !drone",
          },
          {
            name: "Dogma",
            value: "!dog or !dogma",
          },
          {
            name: "Multiple values",
            value: "!drn 5 or !dogma 5",
          },
        ],
        footer: {
          text: `Made with ❤️ by 0xRnato#5058\nWemix Wallet: 0x98f0fbd41a012565412147724384a805d63652ff`,
          icon_url: config.profile_img,
        },
      };
      response = embed;
    default:
      break;
  }

  message.reply({ embeds: [response] });
  return;
});

client.login(config.BOT_TOKEN);
