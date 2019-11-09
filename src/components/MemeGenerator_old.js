import React, {Component} from "react"

class MemeGenerator extends Component{
    constructor(){
        super()
        this.state = {
            memeImg: "http://i.imgflip.com/1bij.jpg",
            topText: "",
            bottomText: "",
            memeAPI: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)

    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({ memeAPI: memes })
            })
    }


    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleClick(event){
        event.preventDefault();
        const randomNumber = Math.floor(Math.random()*this.state.memeAPI.length)
        const randomMeme = this.state.memeAPI[randomNumber].url
        this.setState({ memeImg: randomMeme })
    }

    render(){
        return(
            <div>   
                <form className="meme-form" onSubmit={this.handleClick}>
                    <input
                    name="topText"
                    value={this.state.topText}
                    placeholder="Enter top text"
                    type="text"
                    onChange={this.handleChange}/>
                    <input
                    name="bottomText"
                    value={this.state.bottomText}
                    placeholder="Enter top text"
                    type="text"
                    onChange={this.handleChange}/>
                    <button>GEN</button>
                </form>
                <div className="meme">
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                    <img src={this.state.memeImg} alt="memix"/>
                </div>
            </div>
        )
    }
}

export default MemeGenerator