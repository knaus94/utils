export function minifyIpv4(ip: string) {
   return String(ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0);
}

export function unminifyIpv4(ip: string) {
   const int = parseInt(ip);
   return [int >>> 24, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join('.');
}
