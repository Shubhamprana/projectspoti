console.log('ddwwhwhw')
let currentsong = new Audio();
let songs;
let currfolder;
function secondsToMinutesSeconds(seconds){
    if(isNaN(seconds)|| seconds<0){
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2,'0');
    const formattedSeconds = String(remainingSeconds).padStart(2,'0');
    return `${formattedMinutes}:${formattedSeconds}`;


}
async function getsongs(folder) {
     currfolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/projectspoti/${folder}`)
    let response = await a.text();
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
            // songs.push(element.href)
        }
    }
    // return songs;
    let songUL = document.querySelector(".songlist ").getElementsByTagName("ul")[0]
    songUL.innerHTML =""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>shubham</div>
                            </div>
                            <div class="m">
                            <span>playnow</span>
                            <img class="invert" src="play.svg" alt=""></div>
                       </li>`;
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())


        }
        )

    })
    return songs;}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("/songs/" + track)
    currentsong.Src = `/${currfolder}/` + track
    if (!pause) {
        currentsong.play()
        play.src = "pause.svg"
    }
    // play.src= "pause.svg"
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = " 00:00 / 00:00"
}

async function main() {

    // let currentsong = new Audio();

     songs = await getsongs( "songs/ncs");
    playMusic(songs[0],true)
    await displayAlbums()
     }
      main ()
      currentsong.addEventListener("timeupdate", () => {
        console.log(currentsong.currentTime, currentsong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";

    }
    )
    document.querySelector(".seakbar").addEventListener("click", e => {
        let persent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = persent + "%";
        currentsong.currentTime = ((currentsong.duration) * persent) / 100
    }
    )
    document.querySelector(".hamburgar").addEventListener("click",() => {
        document.querySelector(".left").style.left="0"
    }
    )
     document.querySelector(".close").addEventListener("click",() => {
          document.querySelector(".left").style.left="-120%"
     }
     )
     previous.addEventListener("click",() => {
         currentsong.pause()
         console.log("previous ")
        
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if((index-1)>= 0){
          playMusic(songs[index-1])
           
        }
       
     }
     )
     next.addEventListener("click",() => {
        currentsong.pause()

        console.log("next ")
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if((index+1)<songs.length){
          playMusic(songs[index+1])
           
        }

       
     }
     )
     document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e) => {
        console.log("seting value to",e.target.value) 
        currentsong.volume = parseInt(e.target.value)/100;
        if(currentsong.volume>0){
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg","volume.svg")
        }
       })
       document.querySelector(".volume>img").addEventListener("click",e => {

        if(e.target.src.includes("volume.svg")){
         e.target.src= e.target.src.replace("volume.svg" ,"mute.svg")
         currentsong.volume = 0;
         document.querySelector(".range").getElementsByTagName("input")[0].value=0;
 
        }else{
         e.target.src=e.target.src.replace("mute.svg","volume.svg")
         currentsong.volume = .10;
         document.querySelector(".range").getElementsByTagName("input")[0].value=10;
        }
      }
      )
     
      play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "pause.svg"
        } else {
            currentsong.pause()
            play.src = "play.svg"
            
        }
    })
    