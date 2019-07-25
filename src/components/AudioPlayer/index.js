import React, { Component } from 'react';
import moment from 'moment';
import { transformTimeUnit } from '../../utils'
import './AudioPlayer.scss'

class AudioPlayer extends Component {
    constructor(props) {

        super(props)

        this.state = {
            play: false,
            currentTime: 0,
            duration: 0,
            muted: false
        }

        this.timer = setInterval(() => {
            this.countDown();
          }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    countDown() {
        const audio = document.getElementById('player')

        //current time progress
        const current = Math.ceil(audio.currentTime)
        const formatted = moment.utc(current*1000).format('mm:ss');

        //duration
        const seconds = audio.duration
        const duration = moment.duration(seconds, 'seconds');

        this.setState({ 
            currentOriginal: current,
            currentTime: formatted,
            durationOriginal: Math.ceil(seconds),
            duration: `${transformTimeUnit(duration._data.minutes)}:${transformTimeUnit(duration._data.seconds)}`
        })
    }

    togglePlayer = () => {
        this.setState({
            play: !this.state.play
        })

        const audio = document.getElementById('player')

        if (this.state.play === true) {
            audio.pause()
        } else {
            audio.play() 
        }
    }


    toggleMute = () => {
        this.setState({
            muted: !this.state.muted
        })

        const audio = document.getElementById('player')
        audio.muted = !audio.muted
        
    }

    updateProgress = () => {
        console.log('updateProgress')
    }

    backToStart = () => {
        const audio = document.getElementById('player')
        audio.currentTime = 0
        audio.pause()
        this.setState({
            play: false
        })
    }

    toFinish = () => {
        const audio = document.getElementById('player')
        audio.currentTime = this.state.durationOriginal  
        audio.pause()
        this.setState({
            play: false
        })
    }

    render() {

    const { audio } = this.props;

    const { currentTime, duration, muted, currentOriginal, durationOriginal } = this.state;

    const percentange = (currentOriginal / durationOriginal) * 100;

        return (
        <section className='AudioPlayer'>
            <section className='AudioPlayer-controls'>	
                <div className='AudioPlayer-play'>	
                    {	
                        this.state.play === false ?	
                        <i className="fas fa-play circle" onClick={this.togglePlayer}></i>	
                        :	
                        <i className="fas fa-pause circle" onClick={this.togglePlayer}></i>	
                    }	
                </div>	

                <div className='AudioPlayer-duration'>
                    <p>{`${currentTime} / ${duration}`}</p>
                </div>

                <div className='AudioPlayer-step AudioPlayer-stepBack'>
                    <i className="fas fa-step-backward" onClick={this.backToStart}/>
                </div>

                <section className='AudioPlayer-progress'>	
                    <div className="AudioPlayer-progressOuter" onClick={this.updateProgress}>	
                        <div className="AudioPlayer-progressBar" style={{width: `${percentange}%`}}>	
                        </div>	
                    </div>	
                </section>

                <div className='AudioPlayer-step AudioPlayer-stepForward'>
                    <i className="fas fa-step-forward" onClick={this.toFinish}/>
                </div>

                <section className='AudioPlayer-volume'>
                {   muted ? <i className="fas fa-volume-off" onClick={this.toggleMute}/>
                        :
                    <i className="fas fa-volume-up" onClick={this.toggleMute}/>
                }
                </section>
            </section>	

            <audio id='player' key={audio}>
                <source src='https://firebasestorage.googleapis.com/v0/b/firebasics-79e59.appspot.com/o/episodes%2F18%20MacCunn%20The%20Lay%20of%20the%20Last%20Minstrel%20-%20Part%202%20Final%20chorus%20O%20Caledonia!%20stern%20and%20wild.MP3?alt=media&token=68745e0f-258c-42c8-a00c-47b0dc3a8822' type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>
        </section>
        )
    }
};

export default AudioPlayer;
