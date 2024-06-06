import { useEffect } from "react";
import { FileUpload } from "../../components/FileUpload";

const Index = () => {

  let pic

  useEffect(()=>{
    pic = document.getElementById('file1')?.children[0].data

    for (let i = 0; i < document.getElementsByClassName("square-home").length; i++) {
      pic = document.getElementById('file1')?.children[0].data
      let random = Math.floor(Math.random() * 2);
      if(random == 1){
        document.getElementsByClassName("square-home")[i].style.backgroundImage = `url(${pic})` 
      } else {
        document.getElementsByClassName("square-home")[i].style.backgroundImage = 'none' 
      }
    }
    let random2 = Math.floor(Math.random() * 11);

    document.getElementById('r-logo').src = `/r${random2}.svg`
    const interval = setInterval(() => {
      for (let i = 0; i < document.getElementsByClassName("square-home").length; i++) {
        pic = document.getElementById('file1')?.children[0].data
        let random = Math.floor(Math.random() * 2);
        if(random == 1){
          document.getElementsByClassName("square-home")[i].style.backgroundImage = `url(${pic})` 
        } else {
          document.getElementsByClassName("square-home")[i].style.backgroundImage = 'none' 
        }
      }
        document.getElementById('r-logo').src = `/r${random2}.svg`

       
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  return (
    <div className="home-grid social-grid">
      <div className="r-logo">
        <img id="r-logo" src="/r1.svg"></img>
      </div>
      <div className="img-wrapper">
        <FileUpload idName={'file1'}/>
        <FileUpload idName={'file2'}/>
        <div id="wrapper2">
          <div className='square-container-home'>
            {[...Array(100)].map((squareStudio, j) => {
              return(
                <button key={`square-home${j}`} id={`square-home${j}`} className={`square-home`} style={{backgroundImage: `url(${pic})`}}></button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
