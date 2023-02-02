import Loading from "../components/atoms/Loading";
import { api } from "../utils/api";
import { FORMATTED_HEROES } from "../helpers/constants";
import { ChangeEvent, useState } from "react";
import { NextPage } from "next";
import { THero } from "../types/dota";
import { formatHeroName, splitHeroesByPrimaryAttribute } from "../helpers/convert";
import HeroImage from "../components/atoms/HeroImage";
import HeroLayout from "../components/molecules/HeroLayout";

const HeroesPage: NextPage = () => {
  const heroAttributes = api.openDota.getConstHeroes.useQuery();
  const { data, error, isLoading } = heroAttributes;
  const toArrayData: THero[] = Object.values(data || {});

  const splitHeroes = splitHeroesByPrimaryAttribute(toArrayData);
  const primaryAttributes = Object.entries(splitHeroes);

  const [searchInput, setSearchInput] = useState<string>("");
  const [match, setMatch] = useState<string[]>(FORMATTED_HEROES);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
    const match = FORMATTED_HEROES.filter((hero) =>
      hero.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setMatch(match);
  };

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <p>Something went wrong</p>
  }

  return (
    <section>
      <div className="mx-auto max-w-lg text-center">
        <h2 className="text-3xl py-10 font-bold sm:text-4xl">Heroes</h2>
        <label
          className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search Hero"
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />

          <span
            className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
          >
            Search Hero
          </span>
        </label>
      </div>

      <div>
        {
          primaryAttributes.map(([attribute, heroes]) => (
            <HeroLayout attribute={attribute} key={attribute}>
              {heroes.sort((a, b) => {
                if (a.localized_name < b.localized_name) { return -1; }
                if (a.localized_name > b.localized_name) { return 1; }
                return 0;
              }).map((hero) => (
                <HeroImage
                  key={hero.id}
                  image={hero.img}
                  id={hero.id.toString()}
                  match={match.includes(formatHeroName(hero.localized_name)) ? 'opacity-100' : 'opacity-40'}
                />
              ))}
            </HeroLayout>
          ))
        }
      </div>
    </section>
  );
};

export default HeroesPage;
