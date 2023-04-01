import { calculateHealth } from "../../helpers/convert";
import { THero } from "../../types/dota";

const HeroHealthMana = ({ hero, level }: { hero: THero, level: number }) => {
    const { base_str, str_gain, base_int, int_gain, primary_attr } = hero;
    const health = calculateHealth(base_str, str_gain, level, primary_attr);
    const mana = calculateHealth(base_int, int_gain, level, primary_attr);
    
    const healthBarTick = (health: number) => {
        const healthTicks = [];
        const tickSize = 250;
        const size = Math.round(health/tickSize);
        for (let i = 0; i < size; i++) {
            healthTicks.push(i);
        }
        return healthTicks;
    };

    return (
        <div className="border-black border-2 p-6 rounded space-y-4">
            <div>
                <div className="text-xs leading-relaxed mb-1 flex justify-between">
                    <h3>Health</h3>
                    <p className="font-bold">{health}</p>
                </div>
                <div className="w-full flex gap-1">
                    {healthBarTick(health).map((i, index) => (
                        <div
                            className={`w-full h-2 bg-green-500 ${index === 0 ? "rounded-l" : ""} ${index === healthBarTick(health).length - 1 && index !== 0 ? "rounded-r" : ""
                                }`}
                            key={`health-tick-${i}`}
                        />
                    ))}
                </div>
            </div>
            <div>
                <div className="text-xs flex justify-between items-center mb-1">
                    <h3>Mana</h3>
                    <p className="font-bold">{mana}</p>
                </div>
                <div className="w-full flex">
                        <div className={`w-full h-2 bg-blue-500`} />
                </div>
            </div>
        </div>
    );
};

export default HeroHealthMana;
