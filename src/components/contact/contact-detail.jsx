import { useParams } from "react-router-dom"

export const ContactDetailsPage = () => {
    const {id} = useParams()
    console.log(id,5)
  return (
    <div>contact-detail pafw - {id}</div>
  )
}
