import React, { Component } from 'react'

class GithubUserCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            avatar: '',
            username: '',
            bio: '',
            numFollowing: '',
            numFollowers: '',
        }
    }

    async componentDidMount() {
        const data = await fetch(`https://api.github.com/users/${this.props.username}`)
            .then(response => response.json())
            .catch(err => console.log(err))
        this.setState({
            name: data.name,
            avatar: data.avatar_url,
            username: data.login,
            bio: data.bio,
            numFollowing: data.following,
            numFollowers: data.followers,
        })
        console.log(this.state)
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default GithubUserCard