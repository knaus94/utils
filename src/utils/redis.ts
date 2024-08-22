interface RedisConfig {
   host: string;
   port: number;
   password?: string;
   tls?: {
      ca: string;
      rejectUnauthorized: boolean;
      checkServerIdentity: () => undefined;
   };
}

export function parseIoRedisUrl(redisUrl: string): RedisConfig {
   // Получаем протокол, разделяя строку по '://'
   const protocolSeparatorIndex = redisUrl.indexOf('://');
   if (protocolSeparatorIndex === -1) {
      throw new Error('Invalid Redis URL');
   }

   const protocol = redisUrl.substring(0, protocolSeparatorIndex);
   const restOfUrl = redisUrl.substring(protocolSeparatorIndex + 3);

   // Получаем хост и пароль, разделяя строку по последнему '@'
   const atSymbolIndex = restOfUrl.lastIndexOf('@');
   const credentials = restOfUrl.substring(0, atSymbolIndex);
   const hostAndPort = restOfUrl.substring(atSymbolIndex + 1);

   // Разделяем пароль от пользователя (или просто извлекаем пароль, если нет пользователя)
   const password = credentials;

   // Извлекаем хост и порт
   const colonIndex = hostAndPort.indexOf(':');
   const host = hostAndPort.substring(0, colonIndex);
   const port = parseInt(hostAndPort.split(':')[1].split('?')[0], 10);

   // Обрабатываем параметры TLS
   const queryParams = new URLSearchParams(redisUrl.substring(redisUrl.indexOf('?')));
   const useTls = protocol === 'rediss';
   const ca = queryParams.get('sslcert');

   const config: RedisConfig = {
      host,
      port,
      password,
      tls:
         useTls && ca
            ? {
                 ca: Buffer.from(ca, 'base64').toString(),
                 rejectUnauthorized: true,
                 checkServerIdentity: () => undefined,
              }
            : undefined,
   };

   return config;
}
