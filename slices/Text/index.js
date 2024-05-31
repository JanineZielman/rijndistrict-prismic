import React from 'react'
import { PrismicRichText } from '@prismicio/react'

/**
 * @typedef {import("@prismicio/client").Content.TextSlice} TextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TextSlice>} TextProps
 * @param { TextProps }
 */
const Text = ({ slice }) => (
  <section className='text-section'>
    <span className="title">
      { slice.primary.title &&
        <PrismicRichText field={slice.primary.title}/>
      }
    </span>
    { slice.primary.description &&
      <PrismicRichText field={slice.primary.description}/>
    }
  </section>
)

export default Text