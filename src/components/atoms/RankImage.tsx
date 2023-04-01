const RankImage = ({rank}:{ rank: string | number}) => {
    
    return (
        <img src={`./img/${rank}.png`} alt={`${rank}`} className="h-10 w-10" />
    );
};

export default RankImage;
