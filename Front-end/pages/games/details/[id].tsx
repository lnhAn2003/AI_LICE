import { NextPage } from "next";
import { useRouter } from "next/router";
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

const GameDetailPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    // Fetch game data based on the ID
    // For demonstration, we'll use static data
    const gameData: GameData = {
        title: 'My RPG Adventure',
        uploadedBy: 'gamer123',
        dateUploaded: 'Oct 20, 2024',
        coverImage: 'https://i.pinimg.com/736x/8a/a5/7b/8aa57b58eba14e991b94e6b52250e3a5.jpg',
        description: `Dive into a world of adventure where you can embark on quests, encounter various characters, and shape your destiny. This RPG offers immersive gameplay and an engaging storyline for fantasy lovers.`,
        tags: ['#beta', '#wip'],
        categories: ['RPG', 'Adventure'],
        platforms: ['PC', 'Mac', 'Android', 'iOS'],
        externalLinks: {
            officialWebsite: 'https://myrpgadventure.com',
            gameplayVideo: 'https://youtu.be/gameplayvideo',
            communityForum: 'https://forum.myrpgadventure.com',
        },
        downloadLink: 'https://download.myrpgadventure.com',
        screenshots: [
            'https://i.pinimg.com/564x/7f/15/53/7f1553b575bc0ceaa52412c117ff3aaf.jpg',
            'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ecd2c236-236d-4505-b50b-b4bdd83bb808/d2w85fj-98428498-1fcf-4f8e-a137-71d3a16eb505.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VjZDJjMjM2LTIzNmQtNDUwNS1iNTBiLWI0YmRkODNiYjgwOFwvZDJ3ODVmai05ODQyODQ5OC0xZmNmLTRmOGUtYTEzNy03MWQzYTE2ZWI1MDUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GmE_WuPnQhFb1MDGhQ-HoVV1j2ltvYadeKKoI425N2k',
            'https://i.pinimg.com/736x/93/3a/34/933a34a1c4855a6e8e86d3f69ee1de98.jpg',
        ],
        changelog: [
            {
                date: 'Oct 20, 2024',
                changes: 'Initial release with main storyline and side quests.',
            },
            {
                date: 'Nov 5, 2024',
                changes: 'Added new character and improved graphics.',
            },
        ],
        averageRating: 4.5,
        totalRatings: 85,
        reviews: [
            {
                username: 'playerOne',
                comment: 'Incredible experience! The story is well-crafted.',
                rating: 4.5,
            },
            {
                username: 'adventurer99',
                comment: 'Loved the character designs and quests!',
                rating: 5,
            },
            {
                username: 'retroGamer',
                comment: 'Fun gameplay, but could use more levels.',
                rating: 4.5,
            },
        ],
        communityFeedback: {
            likes: 200,
            dislikes: 15,
            successRate: 93,
            feedbacks: [
                {
                    username: 'playerTwo',
                    comment: 'Would love to see more side quests!',
                },
                {
                    username: 'artFan',
                    comment: 'Graphics are good, but could be more optimized.',
                },
            ],
        },
        comments: [
            {
                username: 'gamerFan1',
                date: 'Oct 22, 2024',
                comment: "Amazing game, can't wait for more updates!",
                replies: [
                    {
                        username: 'playerTwo',
                        date: 'Oct 23, 2024',
                        comment: 'Totally agree, the graphics are awesome!',
                    },
                ],
            },
            {
                username: 'horrorLover42',
                date: 'Oct 21, 2024',
                comment: 'Would be great to add more horror elements.',
                replies: [
                    {
                        username: 'spookyFan',
                        date: 'Oct 22, 2024',
                        comment: 'Yes! Adding a horror level would be amazing.',
                    },
                ],
            },
        ],
    };

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen ">
            <main className="max-w-7xl mx-auto p-4">
                <GameInfo game={gameData} />
                <Description description={gameData.description} />
                <TagsAndCategories
                    tags={gameData.tags}
                    categories={gameData.categories}
                    platforms={gameData.platforms}
                />
                <Screenshots screenshots={gameData.screenshots} />
                <ExternalLinks links={gameData.externalLinks} downloadLink={gameData.downloadLink} />
                <Changelog changelog={gameData.changelog} />
                <RatingsReviews
                    averageRating={gameData.averageRating}
                    totalRatings={gameData.totalRatings}
                    reviews={gameData.reviews}
                />
                <CommunityFeedback feedback={gameData.communityFeedback} />
                <CommentsSection comments={gameData.comments} />
            </main>
        </div>
    );
};

export default GameDetailPage;