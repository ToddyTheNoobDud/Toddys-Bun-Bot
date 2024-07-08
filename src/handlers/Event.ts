import { readdir } from "fs/promises";
import { join, extname } from "path";
import { fileURLToPath } from "url";

export const EventHandler = async (client: { events: { set: (arg0: any, arg1: any) => void; }; once: (arg0: any, arg1: any) => void; on: (arg0: any, arg1: any) => void; }, rootPath: string) => {
    const eventsDir = join(rootPath, "src", "events");
    const eventFiles = await readdir(eventsDir, { withFileTypes: true });

    for (const eventFile of eventFiles) {
        if (eventFile.isFile() && (extname(eventFile.name) === ".ts")) {
            const eventPath = join(eventsDir, eventFile.name);
            const eventUrl = new URL(`file://${eventPath}`, import.meta.url);
            const { Event: clientEvent } = await import(eventUrl.toString());
            if (clientEvent) {
                client.events?.set(clientEvent.name, clientEvent);
                if (!clientEvent.ignore) {
                    const eventFunction = clientEvent.customEvent ? clientEvent.run.bind(null, client) : clientEvent.run.bind(null, client);
                    if (clientEvent.runOnce) client.once(clientEvent.name, eventFunction);
                    else client.on(clientEvent.name, eventFunction);
                }
            }
        }
    }
}

