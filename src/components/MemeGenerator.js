import React, {useState, useEffect} from "react"


const MemeGenerator = () => {
    const [memeImg, setMemeImg] = useState("http://i.imgflip.com/1bij.jpg")
    const [memeAPI, setMemeAPI] = useState([])
    const [values, setValues] = useState({topText: '',bottomText: '' })


    const handleSubmit = e => {
        e.preventDefault();
        const randomNumber = Math.floor(Math.random() * memeAPI.length)
        const randomMeme = memeAPI[randomNumber].url
        setMemeImg(randomMeme)
    }

    const handleChange = e => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                setMemeAPI(memes)
        })
    },[])
    

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
                placeholder="Enter top text"
                type="text"
                onChange={handleChange}/>
                <button>GEN</button>
            </form>
            <div className="meme">
                <h2 className="top">{values.topText}</h2>
                <h2 className="bottom">{values.bottomText}</h2>
                <img src={memeImg} alt="memix"/>
            </div>
        </div>
    )

}

export default MemeGenerator
