import { useState } from "react";
import { Form, Formik, Field } from "formik";
import './header.css'
import './content.css'
import './article.css'


const App = () => {
  const [photos, setPhotos] = useState([])
  const open = url => {
    window.open(url)
  }
  console.log( {photos} )
  return (
    <div className="App">

      <header>
        <Formik
          initialValues={ {search: ''} }
          onSubmit={async values => {
            // llamar API unsplash
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID kwu6Et5eAqNJawoG9Gqx7WZuXiazlnqnU35XcvI844s'
              }
            })
            const data = await response.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name='search' /> 
          </Form>
        </Formik>
      </header>

      <div className="container">
        <div className="center">
          {photos.map( p =>
            <article key={p.id} onClick={ () => open(p.links.html)}>
              <img src={p.urls.regular}/>
              <p>{[p.description, p.alt_description].join(' - ')}</p>
            </article>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default App;
