import React, { Component } from 'react'
import GithubFollowersList from './GithubFollowersList'

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
            followersUrl: '',
            isLoading: true,
        }
    }

    async componentDidMount() {
        const data = await fetch(`https://api.github.com/users/${this.props.username}`)
            .then(response => response.json())
        this.setState({
            name: data.name,
            avatar: data.avatar_url,
            username: data.login,
            bio: data.bio,
            numFollowing: data.following,
            numFollowers: data.followers,
            followersUrl: data.followers_url,
            isLoading: false
        })
    }

    render() {
        return (
            <div className='GithubUserCard'>
                {this.state.isLoading ? <div>LOADING</div> :
                    <div className='container'>
                        <h1>Github User Card</h1>
                        <section className='card'>
                            <img className='card__image' src={this.state.avatar} alt={`${this.state.name}'s avatar`} style={{ height: 300 }} />
                            <h3 className='card__title'>{this.state.name}</h3>
                            <p className='card__bio'>{this.state.bio === null ?
                                'This user is too lazy to write a bio'
                                : this.state.bio}</p>
                            <ul className='card__list'>
                                <li className='card__list-info'>Username: {this.state.username}</li>
                                <li className='card__list-info'>Following: {this.state.numFollowing}</li>
                                <li className='card__list-info'>Followers: {this.state.numFollowers}</li>
                            </ul>
                        </section>
                        <section className='followers'>
                            <h3 className='followers__title'>{this.state.name}'s followers</h3>
                            <GithubFollowersList followersUrl={this.state.followersUrl} />
                        </section>
                    </div>
                }
            </div>
        )
    }
}

export default GithubUserCard