interface Thread {
  title: string
  dateCreated: string
}

interface Post {
  action: string
  threadTitle: string
  date: string
}

interface Game {
  title: string
  sharedOn: string
}

interface RecentActivityProps {
  threads: Thread[]
  posts: Post[]
  games: Game[]
}

const RecentActivity: React.FC<RecentActivityProps> = ({ threads, posts, games }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-center mb-4">Recent Activity and Contributions</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Threads Section */}
        <div className="border p-3 rounded shadow-sm w-full md:col-span-1 text-left">
          <h4 className="font-semibold mb-2">Threads</h4>
          {threads.map((thread, index) => (
            <div key={index} className="mb-2">
              <p className="font-semibold">{thread.title}</p>
              <p className="text-gray-600">Date Created: {thread.dateCreated}</p>
            </div>
          ))}
        </div>

        {/* Posts Section */}
        <div className="border p-3 rounded shadow-sm w-full md:col-span-1 text-left">
          <h4 className="font-semibold mb-2">Posts</h4>
          {posts.map((post, index) => (
            <div key={index} className="mb-2">
              <p>
                <strong>{post.action}</strong> on "{post.threadTitle}"
              </p>
              <p className="text-gray-600">{post.date}</p>
            </div>
          ))}
        </div>

        {/* Games Shared Section (spanning full width on the next row) */}
        <div className="border p-3 rounded shadow-sm w-full md:col-span-2 text-left">
          <h4 className="font-semibold mb-2">Games Shared</h4>
          {games.map((game, index) => (
            <div key={index} className="mb-2">
              <p className="font-semibold">{game.title}</p>
              <p className="text-gray-600">Shared On: {game.sharedOn}</p>
            </div>
          ))}
        </div>

        {/* Placeholder for Courses Section (future addition) */}
        <div className="border p-3 rounded shadow-sm w-full md:col-span-2 text-left">
          <h4 className="font-semibold mb-2">Courses</h4>
          <p>Coming Soon!</p>
        </div>
      </div>
    </div>
  )
}

export default RecentActivity
