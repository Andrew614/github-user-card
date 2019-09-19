import React, { Component } from 'react'
import GithubFollowersList from './GithubFollowersList'

class GithubUserCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: 'andrew614',
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

    componentDidMount() {
        this.fetchUserInfo()
    }

    async fetchUserInfo() {
        this.setState({
            isLoading: true
        })

        const data = await fetch(`https://api.github.com/users/${this.state.query}`)
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

    handleChange = (event) => {
        this.setState({
            query: event.target.value
        })
    }

    handleClick = (event) => {
        event.preventDefault()
        this.fetchUserInfo();
    }

    render() {
        return (
            <div className='GithubUserCard'>
                {this.state.isLoading ? <div>LOADING</div> :
                    <div className='container'>
                        <section className='header'>
                            <h1>Github User Card</h1>
                            <label htmlFor="query">Search Github User</label>
                            <input type="text"
                                id='query'
                                placeholder='github username'
                                onChange={this.handleChange} />
                            <button className='header__button' onClick={this.handleClick}>search</button>
                        </section>
                        <section className='user-card'>
                            <div className='user-card__bio'>
                                <h3 className='user-card__title'>{this.state.name}</h3>
                                <h5 className='user-card__bio'>{this.state.bio === null ?
                                    'This user is too lazy to write a bio'
                                    : this.state.bio}</h5>
                            </div>
                            <div className='user-card__info'>
                                <img className='user-card__image' src={this.state.avatar} alt={`${this.state.name}'s avatar`} />
                                <ul className='user-card__list'>
                                    <li className='user-card__list-info'>Username: {this.state.username}</li>
                                    <li className='user-card__list-info stats'>Following: {this.state.numFollowing}</li>
                                    <li className='user-card__list-info stats'>Followers: {this.state.numFollowers}</li>
                                </ul>
                            </div>
                        </section>
                        <section className='followers'>
                            <h2 className='followers__title'>{this.state.name}'s followers</h2>
                            <GithubFollowersList followersUrl={this.state.followersUrl} />
                        </section>
                    </div>
                }
            </div>
        )
    }
}

export default GithubUserCard