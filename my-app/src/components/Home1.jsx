import React from 'react'
import "./Home1.css"

const Home1 = () => {
  const rows = [
    { src: 'path_to_your_image.jpg', alt: 'Description', text: 'Instant Connection, Genuine Support' },
    { src: 'path_to_your_image.jpg', alt: 'Description', text: 'Empathetic Listening, Kind Hearts' },
    { src: 'path_to_your_image.jpg', alt: 'Description', text: 'Empathetic Listening, Kind Hearts' },
    { src: 'path_to_your_image.jpg', alt: 'Description', text: 'Compassionate Companions, Always Available' },
];
  return (
    <>
    <div className="home1"> 
      <div className="heading">
          <h1>Embrace empathy,</h1>
          <h1>Find your listner</h1>
      </div>
      <table className="custom-table">
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        <td className="image-cell">
                            <img src={row.src} alt={row.alt} className="table-image" />
                        </td>
                        <td>{row.text}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        
    </div>
    </>
  )
}

export default Home1