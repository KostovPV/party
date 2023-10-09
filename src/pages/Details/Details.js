import { useParams } from "react-router-dom"
import { useDocument } from "../../hooks/useDocument";

// components


// styles
import './Details.css'

export default function Details() {
  const { id } = useParams()
  console.log(id);
  
  const { document, error } = useDocument('parties', id)
//   console.log(document);

  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="party-details">
     <div   key={document.id} className="card">
     
     <h3>{document.partyName}</h3>
     <p>{document.details} to make.</p>
     <div>{document.dueDate}</div>
    </div>
    </div>
  )
}