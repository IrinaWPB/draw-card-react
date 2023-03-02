import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'


const Deck = () => {
    
    const [deckId, setDeckId] = useState(null)
    const [cardUrl, setCardUrl] = useState(null)
    const [isDrawing, setDrawing] = useState(false)
    const timerRef = useRef(null)

    useEffect(() => {
      async function getDeckId() {
        const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        setDeckId(res.data.deck_id)
      }
      getDeckId()
    }, [])
    
 
//---------------------with clicks------------------------
  // const drawCard = async () => {
      // const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      // if (res.data.success === false) {
      //   alert('Error: No more cards')
      // }
      // setCardUrl(res.data.cards[0].image)
    
//-------------------------timer----------------------
    useEffect(() => {
      async function getCard() {
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        if (res.data.success === true) {
          setCardUrl(res.data.cards[0].image)
        } else {
          alert('Error: No more cards')
        }
      }
      
      if (isDrawing && !timerRef.current) {
        timerRef.current = setInterval( async () => {
          await getCard()
        }, 1000)
      }

      return () => {
        clearInterval(timerRef.current);
        timerRef.current = null
        }
      }, [isDrawing, setDrawing, deckId]
    )

    const toggle = () => {
      setDrawing(!isDrawing)
    }

    return (
        <div>
            <button onClick={toggle}>{!isDrawing ? 'Draw a card' : 'Stop drawing'}</button>
            <div>
                {cardUrl ? <img src={cardUrl} alt="img"/> : ""}
            </div>
        </div>
    )
}

export default Deck