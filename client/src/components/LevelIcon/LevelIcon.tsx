interface LevelIconProps {
    level: number;
}

const LevelIcon = ({ level }: LevelIconProps) => {
    let icon;
    switch (level) {
        case 1:
            icon = "🔵"; // Level 1 - Beginner
            break;
        case 2:
            icon = "🟢"; // Level 2 - Intermediate
            break;
        case 3:
            icon = "🟡"; // Level 3 - Expert
            break;
        case 4:
            icon = "🟣"; // Level 4 - Advanced
            break;
        default:
            icon = "⚪"; // Default icon
    }

    return <span>{icon}</span>;
};

export default LevelIcon;
