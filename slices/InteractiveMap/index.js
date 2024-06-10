import React from 'react'
import { PrismicRichText } from '@prismicio/react'

/**
 * @typedef {import("@prismicio/client").Content.InteractiveMapSlice} InteractiveMapSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<InteractiveMapSlice>} InteractiveMapProps
 * @param { InteractiveMapProps }
 */
const InteractiveMap = ({ slice }) => (
  <section>
    <div  dangerouslySetInnerHTML={{ __html: slice.primary.svg.html }} />
  </section>
)

export default InteractiveMap