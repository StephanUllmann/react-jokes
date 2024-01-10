import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [jokes, setJokes] = useState([])
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showArr, setShowArr] = useState([])

  const getJokes = async () => {
    try {
      setLoading(true)
      setErr(null)
      const res = await fetch("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist&amount=10")
      const data = await res.json()
      console.log(data)
      if (data.error) throw Error(data.message)
    
      setLoading(false)
      setJokes(data.jokes)
    } catch (error) {
      setErr(error)
      setLoading(false)
      
    }
  }
  const handleNewJokes = (e) => {
		e.target.blur();
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		getJokes();
	};

  useEffect(() => {
    getJokes()
    // fetch("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist&amount=10").then(res => res.json()).then(data => console.log(data))
  }, [])

  return (
    <>
     <h1>Jokes</h1>

     {err && <p>Something went wrong <br/>{err.message}</p>}
     {loading && <p>Loading...</p>}

     {jokes.length > 0 && jokes.map(joke => 
      joke.type === "single" ? 
      <><p key={joke.id}>{joke.joke}</p><hr/></> : 
      <div key={joke.id} >
        <p>{joke.setup}</p>
        {showArr.includes(joke.id) 
        ? <><p>{joke.delivery}</p>
            <button 
            onClick={() => setShowArr(prev => prev.filter(id => id !== joke.id))}>
          Hide Delivery
          </button></> 
        : <button 
            onClick={() => setShowArr(prev => [...prev, joke.id])}>
          Show Delivery
          </button>}
        <hr/></div>)}

        <button onClick={(e) => handleNewJokes(e)}>Get new Jokes</button>
    </>
  )
}

export default App
