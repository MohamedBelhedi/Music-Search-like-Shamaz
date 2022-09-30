import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactAudioPlayer from 'react-audio-player'
import papercss from 'papercss'
export default function App() {
  const [search, setSearch] = useState("")
  const [result, setResult] = useState("")
  const [music, setMusic] = useState([])
  const [vis, setVis] = useState(true)
  const [imgUri, settImgUri] = useState(["https://images.pexels.com/photos/1606655/pexels-photo-1606655.jpeg?cs=srgb&dl=pexels-suvan-chowdhury-1606655.jpg&fm=jpg"])
  const [errBoud, setErrboun] = useState("")
  const fetchData = (e) => {

    const options = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/search',
      params: { term: search, locale: 'en-US', offset: '0', limit: '5' },
      headers: {
        'X-RapidAPI-Key': '89b1d9a968msh60bd0851d8b138ep13474djsn004188407865',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
      }
    };


    if (e.key === "Enter") {
      axios.request(options).then(function(response) {
        console.log(response.data.tracks.hits[0]);
        console.log(response.data.tracks.hits[0].track.hub.actions[1]);
        console.log(response.data.tracks.hits[0].track.images.coverart)
        const randInt = Math.floor(Math.random() * 4)

        setResult(response.data.tracks.hits[0].track === undefined ? alert("geht nicht") : response.data.tracks.hits[0].track)
        setMusic(response.data.tracks.hits[0].track.hub.actions[1])
        settImgUri(response.data.tracks.hits[0].track.images.coverart)


        // error Boud weiter bearbeiten
        { response.data.tracks.hits[0].track.hub.actions[1] === undefined ? alert("geht nicht") : null }

      }).catch(function(error, TypeError) {
        console.error(error);
        setVis(false)
        setResult("")
        setErrboun(TypeError + "Fehler beim abspielen der Datei")
        setTimeout(() => {
          setVis(true)
          setErrboun("")
          setSearch("")
        }, 3000)

      });

    }
  }

  useEffect(() => {


  }, [])
  return (
    <>
      <div className="card d-flex justify-content-center align-self-center col">

        <input onChange={(e) => {
          console.log(e.target.value)
          setSearch(e.target.value)
          { e.target.value.length === 0 ? setResult("Search for new song") | settImgUri("https://images.pexels.com/photos/1606655/pexels-photo-1606655.jpeg?cs=srgb&dl=pexels-suvan-chowdhury-1606655.jpg&fm=jpg") : null }
          console.log(e.target.value.length)
        }} value={search} placeholder="search words from the lyrics...." onKeyPress={fetchData} />
        <h3>{result.subtitle}</h3>

        <h4>{result.title === 0 ? <h4>not found</h4> : result.title}</h4>
        {vis ? <>
          <div className="flex-md-column" >

            {imgUri === 0 ? settImgUri("https://images.pexels.com/photos/1606655/pexels-photo-1606655.jpeg?cs=srgb&dl=pexels-suvan-chowdhury-1606655.jpg&fm=jpg") : <img style={{ width: 300, height: 300 }} src={imgUri} alt={imgUri} />}

            <ReactAudioPlayer
              src={music.uri === undefined ? null : music.uri}
              autoplay
              controls
            />
          </div>
        </>
          : <>
            <h3>{errBoud}</h3>
            <h1>No Song found</h1>


          </>



        }

      </div>


      <div>



      </div>
    </>
  )
}
