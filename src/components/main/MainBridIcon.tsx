import BirdIcon from "@/components/icon/BirdIcon"
import { Large, Small } from "@/components/icon/Cloud"

export default function MainBirdIcon() {
    return (<>
        <div className="main__icon" >
            <Large className="main__icon__brid-icon" />
            <BirdIcon className="main__icon__large-cloud" />
            <Small className="main__icon__small-cloud" />
        </div>
    </>)
}