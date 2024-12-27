import { IconType } from "react-icons"
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings } from "react-icons/fi"

interface LinkItemProps {
    name: string
    icon: IconType
}

const LinkItems: Array<LinkItemProps> = [
    { name: 'Beranda', icon: FiHome },
    { name: 'Jamaah', icon: FiCompass },
]

export default LinkItems;