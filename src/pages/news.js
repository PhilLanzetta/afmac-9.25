import React from 'react'
import { graphql } from 'gatsby'
import { Fade } from 'react-awesome-reveal'
import * as styles from '../components/news.module.css'
import Seo from '../components/seo'
import { GatsbyImage } from 'gatsby-plugin-image'

const News = ({ data }) => {
  const upcomingEvents = data.allContentfulUpcomingEvent.nodes
  return (
    <div className={styles.newsMain}>
      <Fade triggerOnce={true} className={styles.newsHeadContainer}>
        <div className={styles.newsHead}>
          <h1 className='heading center'>News</h1>
        </div>
      </Fade>
      <Fade triggerOnce={true}>
        <div className={styles.upcomingContainer}>
          <div className={styles.upcomingGrid}>
            {upcomingEvents.map((event) => (
              <a
                href={event.linkUrl}
                target='_blank'
                rel='noreferrer'
                key={event.id}
              >
                <Fade triggerOnce={true}>
                  {event.image && (
                    <div className={styles.upcomingImageContainer}>
                      <GatsbyImage
                        image={event.image.gatsbyImageData}
                        alt={event.image.description}
                        className={styles.upcomingImage}
                      ></GatsbyImage>
                    </div>
                  )}
                  <p>{event.title}</p>
                  <p className={styles.upcomingDates}>{event.dates}</p>
                </Fade>
              </a>
            ))}
          </div>
        </div>
      </Fade>
    </div>
  )
}

export const query = graphql`
  query {
    allContentfulUpcomingEvent(sort: { date: DESC }) {
      nodes {
        id
        title
        image {
          description
          gatsbyImageData
        }
        dates
        linkUrl
      }
    }
  }
`

export const Head = () => <Seo title='News' />

export default News
