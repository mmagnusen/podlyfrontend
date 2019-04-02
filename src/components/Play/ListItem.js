import React, { Component } from 'react';

class ListItem extends Component {

    render() {

    const { name, publish_date } = this.props.podcast
    

        return (
            <section className='Play-listItem'>
                <section>
                    <p>{name}</p>
                </section>
                <section>
                    <p>{publish_date}</p>
                </section>
                <section>
                    <p>00:59</p>
                </section>
            </section> 
        )
    }
}

export default ListItem
