import React, { Component } from 'react'
import Player from './player'
import {PlayCircleFilled,PlayCircleOutlined } from '@ant-design/icons';
import {Drawer,Button} from 'antd'
import ResponsivePlayer from '../components/responsivePlayer'



 class Main extends Component {
    state = { visible: false, placement: 'left' };
    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    
      onClose = () => {
        this.setState({
          visible: false,
        });
      };
    render() {
        const song=this.props.currentSong.file || localStorage.getItem('file') 
        return (
            <div className='main'>
                <Drawer
                title="Basic Drawer"
                placement="left"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
                width={400}
                footer={
                  <div
                    style={{
                      textAlign: 'left',
                    }}
                  >
                    <Button className='btnn' style={{cursor:'pointer'}}onClick={this.onClose} >
  
                        Close
                      </Button>
                   
                  </div>
                }
                >
               <ResponsivePlayer/>
                </Drawer>
                <div >
                    {this.props.children}
                </div>
              {song
              ?
                <Player/>
               :
               ''  
            } 
        {song
              ?
            <PlayCircleFilled onClick={this.showDrawer} className='btnn' style={{position:'fixed',borderRadius:50,fontSize:50,bottom:20,left:20,cursor:'pointer'}}/>
         :
         ''       
        } 
            </div>
        )
    }
}

export default Main