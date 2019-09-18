import React, { Component } from 'react'
import GithubFollower from './GithubFollower'

class GithubFollowersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            followers: []
        }
    }

    async componentDidMount() {
        const data = await fetch(this.props.followersUrl).then(response => response.json())
        const followers = data.map(follower => {
            return { username: follower.login, avatar: follower.avatar_url, followerUrl: follower.url }
        })
        this.setState({
            followers: followers
        })
    }

    render() {
        return (
            <div className='GithubFollowersList'>
                {this.state.followers.map(follower =>
                    <GithubFollower key={follower.username} username={follower.username} avatar={follower.avatar} />
                )}
            </div>
        )
    }
}

export default GithubFollowersList