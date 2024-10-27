import React from 'react'

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import "../static/Timeline.css"

const Timeline = ({ events }) => {
  return (
    <div className='timeline-box'>
      <VerticalTimeline>
        {events.map((event , index) => {
          return (
            <VerticalTimelineElement
              key={index}
              date=/* {event.date} */"4:00 - 5:00"
              dateClassName="date"
            >
              <h3 className="vertical-timeline-element-title">
                {/* {event.title} */} {event}
              </h3>
              <h5 className="vertical-timeline-element-subtitle">
                {/* {event.location} */} Event location
              </h5>
              <p className="desc" id="description">{/* {element.description} */} about event </p>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  )
}

export default Timeline