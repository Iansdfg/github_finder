import React, { Component } from 'react'
import Useritem from './Useritem'

export class Users extends Component {
    state = {
        users:[
            {
                id: '1',
                login:'mojombo1',
                avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
                html_url: "https://github.com/mojombo",
            },
            {
                id: '2',
                login:'mojombo2',
                avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
                html_url: "https://github.com/mojombo",
            },
            {
                id: '3',
                login:'mojombo3',
                avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
                html_url: "https://github.com/mojombo",
            }
        ]
    }
    render() {
        return (
            <div style = {userStyle}>
                {this.state.users.map(user => (
                    <Useritem key = {user.id} user = {user} />
                ))}                
            </div>
        )
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns:'repeat(3,1fr)',
    gridGap: '1rem'
}

export default Users
