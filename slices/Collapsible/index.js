import React from 'react'
import { PrismicRichText } from '@prismicio/react'
import ReactCollapsible from 'react-collapsible';
import * as prismicH from "@prismicio/helpers";

/**
 * @typedef {import("@prismicio/client").Content.CollapsibleSlice} CollapsibleSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CollapsibleSlice>} CollapsibleProps
 * @param { CollapsibleProps }
 */
const Collapsible = ({ slice }) => (
  <section id={slice.primary.scroll_id} style={{'scroll-margin-top': '7em'}}>
    <ReactCollapsible trigger={prismicH.asText(slice.primary.title)}>
      <PrismicRichText field={slice.primary.content}/>
    </ReactCollapsible>
  </section>
)

export default Collapsible