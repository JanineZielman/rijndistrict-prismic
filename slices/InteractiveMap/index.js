import { PrismicRichText } from '@prismicio/react'
import React, { useRef, useEffect } from 'react';

/**
 * @typedef {import("@prismicio/client").Content.InteractiveMapSlice} InteractiveMapSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<InteractiveMapSlice>} InteractiveMapProps
 * @param { InteractiveMapProps }
 */
const InteractiveMap = ({ slice }) => {
  useEffect(() => {
    let items = document.getElementById('nummers').children
    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("click", (e) => {
        console.log(document.getElementById(items[i].id))
        document.getElementById(items[i].id + '-Section').scrollIntoView({
          behavior: 'smooth'
        });
      });
    }

  });


  return(
    <section className='interactive-map'>
      <div  dangerouslySetInnerHTML={{ __html: slice.primary.svg }} />
    </section>
  )
}

export default InteractiveMap