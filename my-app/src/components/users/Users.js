import React, { Component } from 'react'
import Useritem from './Useritem'

export class Users extends Component {
    render() {
        console.log(this.props.users)
        return (
            <div style = {userStyle}>
                {this.props.users.map(user => (
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
