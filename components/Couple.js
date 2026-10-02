export default function Couple({holdingHands=true, place='outdoor', lines=['you + me?','always ♡']}){
  return <div className={`couple ${place}`} aria-label="animated couple">
    <div className="person him">
      <div className="hair hHair"></div>
      <div className="head"><span className="glasses">⌒⌒</span><span className="smile">⌣</span></div>
      <div className="body blue"></div>
      <div className="arm leftArm"></div>
    </div>
    <div className="person her">
      <div className="hair sheHair"></div>
      <div className="head"><span className="glasses">⌒⌒</span><span className="smile">⌣</span></div>
      <div className="body rose"></div>
      <div className="arm rightArm"></div>
    </div>
    {place==='movies' && <>
      <div className="seat coupleSeat left"></div>
      <div className="seat coupleSeat right"></div>
    </>}
    {holdingHands && place!=='movies' && <div className="hands">♡</div>}
    {place==='movies' && <div className="movieHands">♡</div>}
    <div className="talkBubble b1">{lines[0]}</div>
    <div className="talkBubble b2">{lines[1]}</div>
  </div>
}
