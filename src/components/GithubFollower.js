import React from 'react'
import './GithubFollower.css'

const GithubFollower = ({ avatar, username }) => {

    return (
        <div className='card'>
            <img className='card__image' src={avatar} alt={username} />
            <h4 className='card__title'>{username}</h4>
        </div>
    )
}

export default GithubFollower