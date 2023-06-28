import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBCardGroup } from 'mdb-react-ui-kit' 
import { Link } from 'react-router-dom';

function CardTour({title, description, tags, _id, name, image}) {
    const excerpt = (str) => {
        if (str.length > 45) {
          str = str.substring(0, 45) + "...";
        }
        return str;
      };
      
    const imageUrl = `http://localhost:5000/uploads/${image}`;
  return (
    <MDBCardGroup>
        <MDBCard className='h-100 mt-3 d-sm-flex mdbcard'>
            <MDBCardImage
            className='card-image'
            src={image}
            alt={title}
            position='top'
            />
            <div className='top-left'>{name}</div>
            <span className='text-start tag-card'>{tags.map((item)=> `#${item}`)}</span>
        <MDBCardBody >
            <MDBCardTitle className='text-start'>{title}</MDBCardTitle>
            <MDBCardText className='text-start'>{excerpt(description)}
            <Link to={`/tour/${_id}`}>Read More</Link>

            </MDBCardText>
        </MDBCardBody>
        </MDBCard>
    </MDBCardGroup>
  )
}

export default CardTour