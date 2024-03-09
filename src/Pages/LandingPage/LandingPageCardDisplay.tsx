import LandingPageIndividualCard from "./LandingPageIndividualCard";


export default function LandingPageCardDisplay() {
    return (
        <div style={{ flexDirection: "row", display: "flex" }}>
            <div style={{ margin: "30px"}}>
                <LandingPageIndividualCard name={'data-analysis'}/>
            </div>

            <div style={{ margin: "30px"}}>
                <LandingPageIndividualCard name={'video-maker'} />
            </div>
        </div>
    )
}
