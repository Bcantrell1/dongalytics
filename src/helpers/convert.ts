import { THero} from "../types/dota";
import { GAME_MODES } from "./constants";

export function steamID64toSteamID32(steamID64: string) {
    return Number(steamID64.slice(-16)) - 6561197960265728
};

export function formatHeroName(name: string){
    return name.split('-').join(' ').toLowerCase();
};

export function splitHeroesByPrimaryAttribute(heroes: THero[]) {
    const stregnth = heroes.filter((hero: THero) => hero.primary_attr === 'str');
    const agility = heroes.filter((hero: THero) => hero.primary_attr === 'agi');
    const intelligence = heroes.filter((hero: THero) => hero.primary_attr === 'int');

    return {
        strength: stregnth,
        agility: agility,
        intelligence: intelligence 
    }
};

export function getGameMode(mode) {
    return GAME_MODES[mode].name.split('_').join(' ').toLowerCase();
}
