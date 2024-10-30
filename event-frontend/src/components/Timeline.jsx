import React from 'react'

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import "../static/Timeline.css"

const Timeline = ({ events, day }) => {
  console.log(events)
  console.log(day)
  return (
    
    <div className='timeline-box'>
      <VerticalTimeline>
        
        {
          events && events.length>0?
            events.filter((eventData)=>`Day${eventData.dayNo}`===day).map((event , index) => (
            
            <VerticalTimelineElement
              key={index}
              date={event.time}
              dateClassName="date"
            >
              <h3 className="vertical-timeline-element-title">
                 {event.name}
              </h3>
              <h5 className="vertical-timeline-element-subtitle">
                {event.venue}
              </h5>
              <p className="desc" id="description">{event.desc} </p>
            </VerticalTimelineElement>
          
            )):
        <div className='loading'></div>
      }
      </VerticalTimeline>
    </div>
  )
}

export default Timeline