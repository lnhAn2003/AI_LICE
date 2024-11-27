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

interface GameData {
  title: string;
  uploadedBy: string;
  dateUploaded: string;
  coverImage: string;
  description: string;
  tags: string[];
  categories: string[];
  platforms: string[];
  externalLinks: {
    officialWebsite: string;
    gameplayVideo: string;
    communityForum: string;
  };
  downloadLink: string;
  screenshots: string[];
  changelog: { date: string; changes: string }[];
  averageRating: number;
  totalRatings: number;
  reviews: {
    username: string;
    comment: string;
    rating: number;
  }[];
  communityFeedback: {
    likes: number;
    dislikes: number;
    successRate: number;
    feedbacks: {
      username: string;
      comment: string;
    }[];
  };
  comments: {
    username: string;
    date: string;
    comment: string;
    replies?: {
      username: string;
      date: string;
      comment: string;
    }[];
  }[];
}

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
        <ExternalLinks links={game.externalLinks} downloadLink={game.downloadLink} />
        <Changelog changelog={game.changelog} />
        <RatingsReviews
          averageRating={game.averageRating}
          totalRatings={game.totalRatings}
          reviews={game.reviews}
        />
        <CommunityFeedback feedback={game.communityFeedback} />
        <CommentsSection comments={game.comments} />
      </main>
    </div>
  );
};

export default GameDetailPage;


export { getGameDetailsServerSideProps as getServerSideProps } from "../../../src/serverside/gameshareds.serverside";
