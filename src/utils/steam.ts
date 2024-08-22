export function steamID64ToSteamID32(steamID64: string) {
   const steamID64BigInt = BigInt(steamID64);
   const steamID32 = steamID64BigInt - BigInt('76561197960265728');
   return String(steamID32);
}

export function steamID32ToSteamID64(steamID32: string): string {
   const steamID64Base = BigInt('76561197960265728');
   const steamID64 = steamID64Base + BigInt(steamID32);
   return String(steamID64);
}

export const STEAM_TRADE_URL_PATTERN = /^(https?:\/\/)?(www\.)?steamcommunity.com\/tradeoffer\/new\/\?partner=[0-9]+&token=[a-zA-Z0-9_-]+$/;

export function parseSteamTradeUrl(url: string) {
   const match = url.match(STEAM_TRADE_URL_PATTERN);

   if (match) {
      const partnerMatch = url.match(/partner=([0-9]+)/);
      const tokenMatch = url.match(/token=([a-zA-Z0-9_-]+)/);

      if (partnerMatch && tokenMatch) {
         const partner = partnerMatch[1];
         const token = tokenMatch[1];

         return { partner, token };
      }
   }

   return null;
}
