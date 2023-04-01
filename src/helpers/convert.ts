import { env } from "../env/client.mjs";
import { BenchMarkType, THero} from "../types/dota";
import { ATTRIBUTE_LEVELS, GAME_MODES, HERO_ICONS, XP_LEVEL } from "./constants";

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

export const getHeroLevel = (xp: number) => {
  if (xp === XP_LEVEL[XP_LEVEL.length - 1]) {
    return 30;
  }

  if (xp >= 0 && xp <= XP_LEVEL[XP_LEVEL.length - 1]) {
    const tXP = [...XP_LEVEL];
    tXP.push(xp);

    const sortedXP = tXP.sort((a, b) => a - b);
    return sortedXP.findIndex((e) => e === xp);
  }
  return 0;
};

export function truncate(input: string) {
  return input?.length > 10 ? `${input.substring(0, 10)}...` : input;
};

export const getBenchMarkPlayers = (
  players: any,
  type: string,
  title: string
) => {
  const result: {
    heroId: number;
    value: number;
    name: string;
    title: string;
    isRadiant: boolean;
  }[] = [];
  console.log(title);
  players.map((player: any) => {
    const { hero_id, personaname, isRadiant } = player;
    result.push({
      heroId: hero_id,
      value: player[type],
      name: personaname ?? "Smurf ?",
      title: title,
      isRadiant: isRadiant,
    });
  });

  const sortedResult = result.sort(
    (a: any, b: any) => Number(b.value) - Number(a.value)
  );
  return sortedResult[0] ?? null;
};

export const calculateHealth = (
  base_str: number,
  str_gain: number,
  level: number,
  type: string
) => {
  let multiplier = 18;
  if (type === "str") {
    multiplier = 22.5;
  }
  const hpFromStrength = Math.round(
    (str_gain * (level - 1) + base_str) * multiplier
  );
  const addedLevels = ATTRIBUTE_LEVELS[level] ?? 0;
  return hpFromStrength + addedLevels + 200;
};

export function getGameMode(mode) {
    return GAME_MODES[mode].name.split('_').join(' ').toLowerCase();
}

export function formatDateTime(unixTimeStamp: number) {
    const date = new Date(unixTimeStamp * 1000);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${month}/${day}/${year}`;
}

export function convertRankName(avg_mmr: number) {
  if (!avg_mmr) {
    return "na";
  }
  if (avg_mmr > 0 && avg_mmr <= 19) {
    return "herald";
  } else if (avg_mmr >= 20 && avg_mmr <= 29) {
    return "guardian";
  } else if (avg_mmr >= 30 && avg_mmr <= 39) {
    return "crusader";
  } else if (avg_mmr >= 40 && avg_mmr <= 49) {
    return "archon";
  } else if (avg_mmr >= 50 && avg_mmr <= 59) {
    return "legend";
  } else if (avg_mmr >= 60 && avg_mmr <= 69) {
    return "ancient";
  } else if (avg_mmr >= 70 && avg_mmr <= 79) {
    return "divine";
  } else if (avg_mmr >= 79) {
    return "immortal";
  }
};
