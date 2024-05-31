import * as prismicH from "@prismicio/helpers";

import { createClient } from "../../prismicio";
import { useEffect } from "react";
import { FileUpload } from "../../components/FileUpload";

const Poster = ({ settings, navigation, page }) => {


  useEffect(() => {
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
    document.getElementById('file2').children[0].style.opacity = 0;
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
        div.style.backgroundImage  = `url(${document.getElementById('file2').children[0].data})`
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
      $(this).css({'backgroundImage': `none`});
    });

    $('.square').mouseup(function(){
      pressedDown = false;
    });
    
    $('.square').mouseover(function(){
      if(pressedDown) {
        $(this).css({'backgroundImage': `none`});
      }
    });
  }

  function printBtn(){
    window.print();
  }


  return (
    <>
    <div className="poster">
      <div className="topbar">
        <h1>{prismicH.asText(settings.data.siteTitle)}</h1>
        <h1 contentEditable>*INSERT NAME*</h1>
      </div>
      <div className="container">
        <div className="images-bg">

          <FileUpload idName={'file2'}/>

          <div id="wrapper">
          </div>

          <FileUpload idName={'file1'} addGrid={addGrid}/>

        </div>

      </div>
      <div className="bottombar">
        <h1>{navigation.data.description}</h1>
        <h1>
          {navigation.data.date}
          <p>www.rijndistrict.nl</p>
        </h1>
      </div>
    </div>
    <div className="print" onClick={printBtn}>Print</div>
    </>
  );
};

export default Poster;



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
