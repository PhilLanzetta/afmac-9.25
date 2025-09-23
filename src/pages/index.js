import React, { useState, useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import { AnimatePresence, motion } from 'motion/react'
import Loader from '../components/loader'
import { Fade } from 'react-awesome-reveal'
import Seo from '../components/seo'
import * as styles from '../components/index.module.css'
import VideoPlayer from '../components/videoPlayer'
import ConvertKit from 'convertkit-react'
import useWindowSize from '../utils/useWindowSize'

const Index = ({ location, data }) => {
  const confirmed = location.hash === '#confirmed'
  const [loading, setLoading] = useState(confirmed ? false : true)
  const [activeVideo, setActiveVideo] = useState(null)
  const {
    homeVideo,
    homeVideoMobile,
    workshopDescription,
    workshopTable,
    upcomingEvents,
    aboutHeroText,
  } = data.contentfulHomePage

  const { width, height } = useWindowSize()

  const isMobile = height > width

  useEffect(() => {
    const body = document.body
    if (loading === true) {
      body.style.position = 'fixed'
    } else {
      body.style.position = ''
    }
  }, [loading])

  useEffect(() => {
    if (localStorage.getItem('intro')) {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    document.getElementById('ck-first-name').required = true
    document.getElementById('ck-email').required = true
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('intro', 'true')
      setLoading(false)
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            intial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key='loader'
          >
            <Loader></Loader>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles.indexMain}>
        <div className={styles.homeVideo}>
          <VideoPlayer
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
            video={isMobile ? homeVideoMobile : homeVideo}
            videoId={isMobile ? homeVideoMobile.id : homeVideo.id}
            isHome={true}
          ></VideoPlayer>
        </div>
        {aboutHeroText && (
          <Fade triggerOnce={true}>
            <div className={styles.aboutHeroText}>
              <div
                dangerouslySetInnerHTML={{
                  __html: aboutHeroText.childMarkdownRemark.html,
                }}
                className={styles.aboutText}
              ></div>
              <Link to='/about' className={styles.aboutBtn}>
                Learn more
              </Link>
            </div>
          </Fade>
        )}
        <Fade triggerOnce={true}>
          <div className={styles.workshopCard}>
            <h2 className='heading'>Workshops</h2>
            <div className={styles.table}>
              {workshopTable.map((item, index) => (
                <div key={index} className={styles.row}>
                  <p className={styles.date}>
                    {new Date(item.date).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                      timeZone: 'Europe/London',
                    })}
                  </p>
                  <div className={styles.rowTitle}>
                    <p className={styles.chapter}>{item.chapter}</p>
                    <p>—</p>
                    <p className={styles.location}>{item.location}</p>
                  </div>
                  <p
                    className={`${styles.status} ${
                      item.status === 'Completed' ? styles.completed : ''
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Fade>
        <Fade triggerOnce={true}>
          <div className={styles.upcomingContainer}>
            <h2 className='heading'>Upcoming Events</h2>
          </div>
        </Fade>
        <div className={styles.emailSignUp} id='confirmed'>
          <p className={styles.emailHeading}>
            {confirmed ? 'Thank You' : 'Join the Journey'}
          </p>
          <ConvertKit
            formId={process.env.GATSBY_FORM_ID}
            className={confirmed ? styles.emailFormConfirmed : styles.emailForm}
            namePlaceholder='Name'
            emailPlaceholder='Email'
            submitText=' →'
          />
          {confirmed && (
            <p className={styles.confirmSubtext}>
              Please check your email to confirm your subscription.
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query {
    contentfulHomePage {
      homeVideo {
        aspectRatio
        id
        videoLink
        posterImage {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      homeVideoMobile {
        aspectRatio
        id
        videoLink
        posterImage {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      aboutHeroText {
        childMarkdownRemark {
          html
        }
      }
      workshopDescription {
        childMarkdownRemark {
          html
        }
      }
      upcomingEvents {
        id
        title
        image {
          description
          gatsbyImageData
        }
        dates
      }
      workshopTable {
        chapter
        date
        location
        status
      }
    }
  }
`

export const Head = () => <Seo title='Home' />

export default Index
