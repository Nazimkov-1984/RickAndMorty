import "./Episode.css";
interface IProps {
  episodes?: string[];
}

const Episodes = (props: IProps) => {
  return (
    <div className="episodeContainer">
      {props?.episodes?.map((episode, index) => {
        const numberEpisode = episode.split("/").slice(-1)[0];
        return (
          <div key={`key${index}`} className="episodeNumber">
            {numberEpisode}
          </div>
        );
      })}
    </div>
  );
};
export default Episodes;
