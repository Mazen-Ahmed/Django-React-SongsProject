import React, { Component } from 'react'

export default class Audio extends Component {
    render() {
      
        return (
            <div>
                <audio 
                src={this.props.urls} 
                preload='auto'
                ref='audio_tag'
                onEnded={this.props.handleEnd}
                onCanPlay={(e)=>this.props.onCanPlay(e.target.value)}
                onTimeUpdate={(e) => this.props.onTimeUpdate(e.target.currentTime)}
                autoPlay={this.props.auto}
                id='Aud'
                />
            </div>
        )
    }
}
