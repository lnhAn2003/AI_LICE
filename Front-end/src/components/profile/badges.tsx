interface Badge {
    icon: string
    title: string
    description: string
  }
  
  interface BadgesProps {
    earnedBadges: Badge[]
    upcomingBadges: Badge[]
  }
  
  const Badges: React.FC<BadgesProps> = ({ earnedBadges, upcomingBadges }) => {
    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Badges and Achievements</h3>
        <div className="mt-4">
          <h4 className="font-semibold">Earned Badges</h4>
          <div className="grid grid-cols-1 gap-4 mt-2">
            {earnedBadges.map((badge, index) => (
              <div key={index} className="flex items-center">
                <span className="text-2xl">{badge.icon}</span>
                <div className="ml-4">
                  <p className="font-semibold">{badge.title}</p>
                  <p className="text-gray-600">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">Upcoming Badges</h4>
          <div className="grid grid-cols-1 gap-4 mt-2">
            {upcomingBadges.map((badge, index) => (
              <div key={index} className="flex items-center opacity-50">
                <span className="text-2xl">{badge.icon}</span>
                <div className="ml-4">
                  <p className="font-semibold">{badge.title}</p>
                  <p className="text-gray-600">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  export default Badges
  