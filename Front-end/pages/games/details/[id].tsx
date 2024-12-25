// pages/games/details/[id].tsx

import { NextPage } from "next";
import GameInfo from "../../../src/components/game/detail/gameinfo";
import Description from "../../../src/components/game/detail/description";
import TagsAndCategories from "../../../src/components/game/detail/tagsandcategories";
import ExternalLinks from "../../../src/components/game/detail/externallinks";
import Screenshots from "../../../src/components/game/detail/screenshots";
import Changelog from "../../../src/components/game/detail/changelogs";
import RatingsReviews from "../../../src/components/game/detail/ratingreviews";
import CommunityFeedback from "../../../src/components/game/detail/communityfeedback";
import CommentsSection from "../../../src/components/game/detail/commentsection";
import { GameData } from "../../../src/types/game";

interface GameDetailPageProps {
  game: GameData;
}

const GameDetailPage: NextPage<GameDetailPageProps> = ({ game }) => {
  if (!game) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Game details could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <main className="max-w-7xl mx-auto p-4">
        <GameInfo game={game} />
        <Description description={game.description} />
        <TagsAndCategories
          tags={game.tags}
          categories={game.categories}
          platforms={game.platforms}
        />
        <Screenshots screenshots={game.screenshots} />
        <ExternalLinks links={game.externalLinks} downloadLink={game.downloadLink} gameId={game._id} />
        <Changelog changelog={game.changelog} />
        <RatingsReviews
          averageRating={game.averageRating}
          totalRatings={game.ratingCount}
          reviews={game.reviews}
        />
        <CommunityFeedback feedback={game.communityFeedback} />
        <CommentsSection 
          comments={game.comments} 
          targetType="GameShared" 
          targetId={game._id} 
        />
      </main>
    </div>
  );
};

export default GameDetailPage;

export { getGameDetailsServerSideProps as getServerSideProps } from "../../../src/serverside/gameshareds.serverside";
