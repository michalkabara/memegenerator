import React, {useState, useEffect} from 'react'


const MemeGenerator = () => {

    const [values, setValues] = useState({topText: '',bottomText: '' })
    const [memeData, setMemeData] = useState([])
    const [memeImage, setMemeImage] = useState("http://i.imgflip.com/1bij.jpg")

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            setMemeData(memes)
        })
    })

    const handleChange = e => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }
      
    const handleSubmit = e => {
        e.preventDefault();
        const randomNumber = Math.floor(Math.random()*memeData.length);
        const randomImage = memeData[randomNumber].url
        setMemeImage(randomImage)
    }

    return(
        <div>
            <form className="meme-form" onSubmit={handleSubmit}> 
                <input 
                name="topText"
                value={values.topText}
                placeholder="Enter top text"
                type="text"
                onChange={handleChange}/>
                <input 
                name="bottomText"
                value={values.bottomText}
                placeholder="Enter bottom text"
                type="text"
                onChange={handleChange}/>
                <button>GEN</button>
            </form>

            <div className="meme">
                <img src={memeImage} alt="memeimg"></img>
                <h2 className="top">{values.topText}</h2>
                <h2 className="bottom">{values.bottomText}</h2>
            </div>
        </div>
    )

}

export default MemeGenerator