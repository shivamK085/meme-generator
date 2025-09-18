import { useState, useEffect } from "react"

export default function Main() {

    const [memeInfo, setMemeInfo] = useState(
        {
            topText: "One does not simply",
            bottomText: "Walk into Mordor",
            imageUrl: "http://i.imgflip.com/1bij.jpg"
        }
    )

    const [allMemes, setAllMemes] = useState([])


    useEffect(() => {
        fetch(" https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function handleChange(event) {
        const { value, name } = event.currentTarget

        setMemeInfo(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    function getRandomImage() {
        let ind = Math.floor((Math.random() * 100) + 1)
        const newImage = allMemes[ind]
        setMemeInfo(prevMeme => ({
            ...prevMeme,
            imageUrl: newImage.url
        }))
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={memeInfo.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={memeInfo.bottomText}
                    />
                </label>
                <button onClick={getRandomImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={memeInfo.imageUrl} />
                <span className="top">{memeInfo.topText}</span>
                <span className="bottom">{memeInfo.bottomText}</span>
            </div>
        </main>
    )
}