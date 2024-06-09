import React, { useEffect } from "react";
import "./pokemon.css";
import { Detail } from "../interface";

interface Props {
  name: string;
  id: number;
  image: string;
  abilities:
    | {
        ability: string;
        name: string;
      }[]
    | undefined;

  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonList: React.FC<Props> = (props) => {
  const { name, id, image, abilities, viewDetail, setDetail } = props;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  useEffect(() => {
    setIsOpen(id === viewDetail.id);
  }, [viewDetail]);

    const closeDetail = () => {
        setDetail({
        id: 0,
        isOpened: false,
        });
    };

  return (
    <div className="">
      <div className="">
        {isOpen ? (
          <section className="pokemon-list-detailed">
            <div className="detail-container">
              <p className="detail-close" onClick={closeDetail}>X</p>
              <div className="detail-info">
                <img src={image} alt="" className="detail-img" />
                <p className="detail-name">{name}</p>
              </div>
              <div className="detail-skill">
                <p className="detail-ability">Abilities:</p>
                {abilities?.map((ab: any) => {
                  return <div>{ab.ability.name}</div>;
                })}
              </div>
            </div>
          </section>
        ) : (
          <div></div>
        )}
      </div>
      <section className="pokemon-list-container">
        <p className="pokemon-name">{name}</p>
        <img src={image} alt="pokemon" />
      </section>
    </div>
  );
};

export default PokemonList;
