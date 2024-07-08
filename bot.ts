import { DisTube } from "distube";
import { Client, GatewayIntentBits, Partials } from "discord.js";
import { YouTubePlugin } from "@distube/youtube";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { token } from './config.ts';


const __dirname = dirname(fileURLToPath(import.meta.url));
export const rootPath = __dirname;

declare module "discord.js" {
    interface Client {
      slashCommands: Map<string, any>;
      events: Map<string, any>;
    }
  }
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [
        Partials.Channel
    ],
    
});
  

const distube = new DisTube(client, {
    plugins: [
        new YouTubePlugin()
    ],
    savePreviousSongs: false,
});

const ytPlugin = new YouTubePlugin()

client.events = new Map(); //@ts-ignore
client.slashCommands = new Map(); //@ts-ignore
client.distube = distube;
await Promise.all([
    import("./src/handlers/Event").then(({ EventHandler }) =>
        EventHandler(client, rootPath) //@ts-ignore
      ),
    import("./src/handlers/Command").then(({ CommandHandler }) =>
        CommandHandler(client, rootPath) //@ts-ignore
      ),
])
client.login(token)

client.on("ready", () => {
    console.log("Ready!")
})
