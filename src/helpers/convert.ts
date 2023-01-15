export function steamID64toSteamID32(steamID64: string) {
    return Number(steamID64.slice(-16)) - 6561197960265728
}
