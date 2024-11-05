interface AvatarSectionProps {
    avatarUrl: string
    onEdit: () => void
  }
  
  const AvatarSection: React.FC<AvatarSectionProps> = ({ avatarUrl, onEdit }) => {
    return (
      <div className="text-center">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-32 h-32 rounded-full mx-auto"
        />
        <button
          onClick={onEdit}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit Avatar
        </button>
      </div>
    )
  }
  
  export default AvatarSection
  