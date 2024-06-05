import * as prismicH from "@prismicio/helpers";

import { createClient } from "../../prismicio";
import { useEffect } from "react";
import { FileUpload } from "../../components/FileUpload";

const Logo = ({ settings, navigation, page }) => {


  useEffect(() => {
    addGrid();
    checkGrid();
  });

  let list = [];
  useEffect(() => {
    
    for (let i = 8; i < 200; i = i + 8) {
      list.push(i)
      list.push(i + 1)
      list.push(i - 1)
    }
    console.log(list)
  }, [])




  function addGrid(){
    let container = document.createElement('div');  
    let idVal = document.createAttribute('class');
    idVal.value = 'square-container';
    container.setAttributeNode(idVal);     
    document.getElementById('wrapper').appendChild(container);
    for(let i = 0; i < 200; i++) {
        let div = document.createElement('button');
        let attr = document.createAttribute('class');
        attr.value = 'square';
        div.id = `square${i}`;
        let random = Math.floor(Math.random() * 2)
        if (random == 1 && list.includes(i)){
          div.style.backgroundColor = 'white';
          div.style.backgroundImage = 'none';
        }
        div.setAttributeNode(attr);
        container.appendChild(div);
    }
    checkGrid()
  }

  function checkGrid(){
  
    var pressedDown = false;
    $(document).on('mousedown', function(){
      pressedDown = true;     // When mouse goes down, set pressedDown to true
    })  
    .mouseup(function() {
      pressedDown = false;    // When mouse goes up, set pressedDown to false
    });
    
    $('.square').mousedown(function(){
      $(this).css({'backgroundColor': `black`});
    });

    $('.square').mouseup(function(){
      pressedDown = false;
    });
    
    $('.square').mouseover(function(){
      if(pressedDown) {
        $(this).css({'backgroundColor': `black`});
      }
    });
  }

  function printBtn(){
    window.print();
  }


  return (
    <>
    <div className="poster poster-logo">
      <div className="container2">
        <div className="images-bg">


          <div id="wrapper">
          </div>

        
        </div>

      </div>
    </div>
    <div className="print" onClick={printBtn}>Print</div>
    </>
  );
};

export default Logo;



export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });
  const page = await client.getSingle("home", { lang: locale });


  return {
    props: {
      navigation,
      settings,
      page
    },
  };
}
