import { Link, useParams } from "react-router-dom"
import { useDocument } from "../../hooks/useDocument"
import { useAuthContext } from "../../hooks/useAuthContext";
import './Details.css'
import Card from "../../components/Card/Card";
import { Timestamp } from "firebase/firestore";

export default function Details() {
  const { id } = useParams()
  const { user } = useAuthContext();
  const userId = user?.uid;
let formattedDate = null;
  const { document, error } = useDocument('parties', id)
  console.log(document);
  if(document){
    const timestamp = document.date
  console.log( 'timestamp',timestamp)

  const milliseconds = timestamp.seconds * 1000;
  
  const date = new Date(milliseconds);

  // Extract day, month, and year
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-indexed, so add 1
  const year = date.getFullYear();
  
  // Create a formatted date string
  formattedDate = `${day}.${month}.${year}`;
  
  console.log(formattedDate); // Output: 20.11.2023

  }
  const canEdit = (document?.author === userId)
  console.log('canEdit', canEdit);
  
  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }

  return (document && formattedDate!=undefined &&(
    <Card className="party-item">
      <div key={document.id} className="party-item-description">

        <h3>{document.partyName}</h3>
        <p>{document.details} to make.</p>
        <p>{document.createdBy} Created by</p>
        <p>{document.category.label} </p>
        { <div>{formattedDate}</div> }
        {canEdit && (
          <div><Link to={`/list/${id}/edit`} party={document} >Edit</Link></div>
          
        )}
      </div>
    </Card>
  )
  )
}