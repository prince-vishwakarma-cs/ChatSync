import React from 'react'
import { transformImge } from '../../libs/features'
import { Download } from 'react-feather'

const RenderAttachment = (file,url) => {
    switch(file){
        case "image":
            return <img src={transformImge(url,200)} alt="attachment" width={"200px"} height={"150px"} style={{objectFit:"cover", borderRadius:"0.5rem"}}/>
        case "video":
            return <video src={url} controls preload='none' width={"200px"}/>
        case "audio":
            return <audio src={url} controls preload='none ' />
        default:
            return <Download/>
    }
}

export default RenderAttachment