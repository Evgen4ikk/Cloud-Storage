export function bytesToKB(bytes: number) {
  const KB = Math.round(bytes / 1024);
  const MB = Math.round(KB / 1024);

  if (MB >= 1) {
    return ` ${MB} Mb `;
  } else {
    return ` ${KB} Kb `;
  }
}
