import React, { Component } from 'react';
import { Input, Message, Button } from '../';
import './Community.scss'

class Community extends Component {

    state = {
        messages: [
            {
                user: {
                    name: 'Marilyn',
                },
                date: '12th May 2019',
                title: 'Lorem Ipsum is simply ',
                text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of 
                    type and scrambled it to make a type specimen book. It has survived not only five centuries, but 
                    also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in 
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
                    with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            },
            {
                user: {
                    name: 'Hassan',
                },
                date: '12th May 2019',
                title: 'Lorem Ipsum is simply ',
                text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of 
                    type and scrambled it to make a type specimen book. It has survived not only five centuries, but 
                    also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in 
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
                    with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            },
            {
                user: {
                    name: 'Davina',
                },
                date: '12th May 2019',
                title: 'Lorem Ipsum is simply ',
                text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of 
                    type and scrambled it to make a type specimen book. It has survived not only five centuries, but 
                    also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in 
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
                    with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            },
            {
                user: {
                    name: 'Stuart',
                },
                date: '12th May 2019',
                title: 'Lorem Ipsum is simply ',
                text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of 
                    type and scrambled it to make a type specimen book. It has survived not only five centuries, but 
                    also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in 
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
                    with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            },
        ]
    }

  render() {

    return (
            <div className='Community'>
                <div className='Community-inner'>
                    <section className='Community-title'><h3>Community Hub</h3></section>
                    <section className='Community-postButton'><Button>Create a post</Button></section>
                    <section>
                        {this.state.messages.map((message) => <Message message={message}/>)}
                    </section>
                </div>
            </div>
    );
  }
}

export default Community;
