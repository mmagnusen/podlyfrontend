import React, { Component } from 'react';
import { connect } from 'react-redux'
import discoverAsyncActions from './../../redux/actions/discover/asyncActions'
import mp3 from '../../resources/lay.mp3'
import ListItem from './ListItem'
import axios from 'axios'
import { ENDPOINT } from '../../constants'
import './Play.scss'

class Play extends Component {

    state = {
        podcast: {}
    }

    componentDidMount() {
        this.props.dispatch(discoverAsyncActions.freshRequest())

        const singleEndpoint = `${ENDPOINT}/api/episode?slug=${this.props.slug}`
            axios.get(singleEndpoint)
            .then((response) => {
               this.setState({
                   podcast: response.data[0]
               })
            })

      }

    render() {

    const { episodes } = this.props
    const { podcast } = this.state.podcast

    console.log(this.state)



    console.log('from play', this.props)

        return (
            <section className='Play'>
                <section className='Play-inner'>
                    <section className='Play-info' >
                        <img src="https://picsum.photos/200/300" alt='hosts'/>
                        <div>
                            <h3>{podcast}</h3>
                            <p>Abadesi, Michael</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting 
                                industry. Lorem Ipsum has been the industry's standard dummy text 
                                ever since the 1500s, when an unknown printer took a galley of 
                                type and scrambled it to make a type specimen book. It has survived 
                                not only five centuries, but also the leap into electronic 
                                typesetting, remaining essentially unchanged. It was popularised 
                                in the 1960s with the release of Letraset sheets containing Lorem 
                                Ipsum passages, and more recently with desktop publishing software 
                                like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </section>
                    <section className='Play-player'>
                        <audio controls>
                            <source src={mp3} type="audio/mpeg"/>
                            Your browser does not support the audio element.
                        </audio>
                    </section>

                    <section  className='Play-list'>
                        { episodes && episodes.map(( podcast ) => <ListItem podcast={podcast}/>)}
                    </section>
                </section>
            </section> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        discover: state.discover
    }
}

export default connect(mapStateToProps)(Play)
