interface Preferences {
    notifications: boolean
    theme: string
    locale: string
    timezone: string
  }
  
  interface AboutPreferencesProps {
    bio: string
    preferences: Preferences
  }
  
  const AboutPreferences: React.FC<AboutPreferencesProps> = ({ bio, preferences }) => {
    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold">About and Preferences</h3>
        <div className="mt-4">
          <h4 className="font-semibold">Bio</h4>
          <p className="text-gray-600 mt-2">{bio}</p>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">Preferences</h4>
          <ul className="mt-2">
            <li><strong>Notifications:</strong> {preferences.notifications ? 'Enabled' : 'Disabled'}</li>
            <li><strong>Theme:</strong> {preferences.theme}</li>
            <li><strong>Locale:</strong> {preferences.locale}</li>
            <li><strong>Timezone:</strong> {preferences.timezone}</li>
          </ul>
        </div>
      </div>
    )
  }
  
  export default AboutPreferences
  