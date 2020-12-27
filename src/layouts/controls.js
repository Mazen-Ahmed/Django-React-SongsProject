import React,{useState, useRef} from 'react'
import {SoundOutlined,PlayCircleOutlined,UnorderedListOutlined ,HeartOutlined,PauseCircleOutlined,HeartFilled ,StepBackwardOutlined,StepForwardOutlined,NodeExpandOutlined,RetweetOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import * as songActions from '../store/actions/songActions'
import * as playerActions from '../store/actions/playerActions1'
import { List, Avatar,Tooltip,Slider,Modal,Button } from 'antd';
import { Link } from 'react-router-dom';
import ResponsivePlayer from '../components/responsivePlayer'
import ReactDOM from 'react-dom';




const Controls =(props)=> {
const audio = useRef('audio_tag');

const [statevolum, setStateVolum] = useState(1)
const [modal2Visible,setVisible]=useState(false)
const [repeat,setRepeat]=useState(false)
const fmtMSS = (s) => { return (s - (s %= 60)) / 60 + (10 < s ? ':' : ':0') + ~~(s) }
let urls=props.currentSong.file || localStorage.getItem('file')
let auto= props.paused  ? false : true
   const togglePlaying=()=>{
    const audio = document.getElementById('Aud');
    props.play(audio);
   }
  
   
   
const handleEnd=()=>{
     const sgs=JSON.parse(localStorage.getItem('playlist'))
     let songId= JSON.parse(localStorage.getItem('id'))
     let currentIndex=sgs.findIndex(song=>song.id===songId)


    if (sgs[currentIndex] === sgs.length-1  ){
       currentIndex=0
       props.setCurrentSong(sgs[currentIndex].id)

     }
   
    else{
        let next=currentIndex+1
        if(next >= sgs.length-1){
          next=0
          props.setCurrentSong(sgs[next].id)

        }
        else{
          props.setCurrentSong(sgs[next].id)

        }
    }
   }


const handleNextPrev=(np)=>{
  const sgs=JSON.parse(localStorage.getItem('playlist'))
  let songId= JSON.parse( localStorage.getItem('id'))
  let currentIndex=sgs.findIndex(song=>song.id===songId)
  if(np==='next')
  {
            if (currentIndex === sgs.length-1 )
            {
              currentIndex=0
              props.setCurrentSong(sgs[currentIndex].id)

            }else{
                const next=currentIndex+1
                props.setCurrentSong(sgs[next].id)
            }
    }
            else if(np==='prev')
    {
            if (currentIndex === 0 )
            {
              props.setCurrentSong(sgs[sgs.length-1].id)
            } 
            else
            {
              const previous=currentIndex-1
              props.setCurrentSong(sgs[previous].id)
            }
    }
    
}
const setPlay=(id)=>{
  props.setCurrentSong(id)
  props.setPlaylist(JSON.parse(localStorage.getItem('playlist')))
}

const handleProgress = (e) => {
      let compute = (e.target.value * props.duration ) / 100 ;
      props.setCurrentTime(compute)
      audio.current.currentTime=compute
    }
  

const handleVolume = (q) => {
  setStateVolum(q);
  audio.current.volume = q;
  localStorage.setItem('volum',q)
}


let songId=props.currentSong && props.currentSong.id || localStorage.getItem('id')&&localStorage.getItem('id')


let songName=null
if(localStorage.getItem('songName')&&localStorage.getItem('songName').length > 43){
      songName=localStorage.getItem('songName').substr(0,40)+'...'
}else{
      songName=localStorage.getItem('songName')
}
     
return (
            <div className='controls' style={{paddingLeft:180,paddingBottom:20}} >
          <Modal
          title="Current Playlist"
          centered
          visible={modal2Visible}
          style={{top: 0 }}
          closable={false}
          footer={[
          <Button type='primary' key="back" onClick={() => setVisible(false)}>
              Ok
            </Button>,
           
          ]}
        >
           <List
            style={{width:'100%',overflow:'auto',height:300 }}
            dataSource={JSON.parse(localStorage.getItem('playlist'))}
            loading={props.loading}
            renderItem={item => (
              <List.Item key={item.id}  
               actions={[
                songId==item.id
                ?
                <p style={{color:'#8e44ad'}}>
                Now Playing
                </p>
                :
              <Tooltip placement="bottom" title='Play'>
              <a key="list-loadmore-edit"onClick={()=>setPlay(item.id)}  >
              <PlayCircleOutlined style={{fontSize:20,color:'#8e44ad'}} /></a></Tooltip>
              
            ]}>
              <List.Item.Meta
                  
                  avatar={<Avatar src={item.cover}/>}
                  title={<Link to={`/song/${item.id}`}>{item.name} </Link>}
                  description={item.upload_date}
                />
                
              </List.Item>
            )}
          />
        </Modal>
               <audio 
                src={urls} 
                ref={audio}
                onCanPlay={(e) => props.getDuration(e.target.duration)}
                onTimeUpdate={(e) => props.getCurrentTime(e.target.currentTime)}
                onEnded={handleEnd}
                type="audio/mpeg"
                preload='true'
                autoPlay={auto}
                id='Aud'
                />

                <div class='vlme'style={{width:100 ,marginLeft:100,marginBottom:5,marginTop:20}} >
                <span className='volum' style={{fontSize:18,marginBottom:10}}><SoundOutlined /></span>
                <input  value={statevolum * 100}  type='range' name='volBar' onChange={(e) => handleVolume(e.target.value / 100)} id='volBar' />
                </div>
             
            <div className='musicControls'>
            <span style={{fontSize:18}} onClick={()=>{handleNextPrev('prev')}}  ><StepBackwardOutlined /></span>
            <span  style={{fontSize:18}}   >
            <span onClick={togglePlaying.bind(this)} >
                
            {props.paused ?<PlayCircleOutlined/>:<PauseCircleOutlined/>}
            </span>
         
            </span>
            <span  style={{fontSize:18}} onClick={()=>{handleNextPrev('next')}}  ><StepForwardOutlined /></span>
            </div>
            <div className='progressb' >
        <span className='currentT' >{fmtMSS(props.currentTime)}</span>
       
        <input
        type='range'
        onChange={handleProgress}
        value={props.duration ? (props.currentTime * 100) / props.duration : 0}
        style={{marginBottom:15,marginRight:25,cursor:'pointer'}}
        class='progressb'    
        id='prg'
        />
          

                <span className='totalT'>{props.duration ?  fmtMSS(props.duration): '0:00'}</span>
            </div>
            <span className='random' style={{fontSize:18,margin:5,marginLeft:20}}><NodeExpandOutlined /></span>
            { repeat 
            ?
            <span className='repeat' style={{fontSize:18,margin:5,color:'#1890ff',cursor:'pointer'}} onClick={()=>setRepeat(false)}><RetweetOutlined /></span>
           :
           <span  className='repeat' style={{fontSize:18,margin:5,cursor:'pointer'}} onClick={()=>setRepeat(true)}><RetweetOutlined /></span>

            }
            <div className='songdisplay' style={{marginLeft:50,overflow:'hidden',marginTop:12,width:400}}>
            <List.Item 
              
              actions={[
              
              <Tooltip placement="top" title='Current Playlist'>
              <a key="list-loadmore-edit" style={{marginLeft:5}} onClick={()=>setVisible(true)}  >
              <UnorderedListOutlined  style={{fontSize:18,color:'#fff'}} /></a></Tooltip>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar style={{width:40,height:40}} src={localStorage.getItem('songCover')} />}
                title={<Link style={{overflow:'auto',color:'#fff'}}   to={`/song/${props.currentSong.id || localStorage.getItem('id')}`}>{songName}</Link>}
                description={<a style={{color:'#b2bec3',display:'block'}}>{localStorage.getItem('uploader')}</a>}
              />

      </List.Item>
 
              
           
            </div>
            </div>
        )



    }
    const mapStateToProps=state=>{
        return{
          isAuthenticated:state.auth.token!==null,
          loading:state.song.loading,
          paused:state.player.paused,
          duration:state.player.duration,
          currentTime:state.player.currentTime,
          songs:state.player.songs,
          currentSong:state.player.currentTrack      
        }
      }  
      
      const mapDispatchToProps=dispatch=>{
        return{
          play:(audio)=>dispatch(playerActions.play(audio)),
          searchUploadings:(name,token)=>dispatch(songActions.searchUploadings(name,token)),
          listCategories:()=>dispatch(songActions.getCategories()),
          setCurrentSong:(id)=>dispatch(playerActions.setCurrentSong(id)),
          ToggleLike:(token,id)=>dispatch(songActions.uploadToggleLike(token,id)),
          setListeningHistory:(song_id,token)=>dispatch(playerActions.setListeningHistory(song_id,token)),
          setPlaylist:(playlist)=>dispatch(playerActions.setPlaylist(playlist)),
          getDuration:(audio)=>dispatch(playerActions.getDuration(audio)),
          getCurrentTime:(currentTime)=>dispatch(playerActions.getCurrentTime(currentTime)),
          setCurrentTime:(value)=>dispatch(playerActions.setCurrentTime(value)),


        }
      }
      
      export default connect(mapStateToProps,mapDispatchToProps)(Controls);