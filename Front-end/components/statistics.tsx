interface StatisticsProps {
    threadsCreated: number
    postsMade: number
    gamesShared: number
    aiInteractions: number
  }
  
  const Statistics: React.FC<StatisticsProps> = ({
    threadsCreated,
    postsMade,
    gamesShared,
    aiInteractions,
  }) => {
    return (
      <div className="bg-gray-100 p-4 rounded mt-6">
        <h3 className="font-semibold mb-2">Statistics</h3>
        <ul>
          <li><strong>Threads Created:</strong> {threadsCreated}</li>
          <li><strong>Posts Made:</strong> {postsMade}</li>
          <li><strong>Games Shared:</strong> {gamesShared}</li>
          <li><strong>AI Interactions:</strong> {aiInteractions}</li>
        </ul>
      </div>
    )
  }
  
  export default Statistics
  