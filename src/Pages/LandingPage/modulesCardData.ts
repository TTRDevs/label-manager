import dataAnalysisImage from './../../assets/DataAnalysis.webp';
import videoMakerImage from './../../assets/VideoMaker.webp'
import releasesImage from './../../assets/Releases2.webp'
import promosImage from './../../assets/Promos.webp'
import demosImage from './../../assets/Demos.webp'
import calendarImage from './../../assets/Calendar.webp'
import adImage from './../../assets/Ad.webp'
import mixtapesImage from './../../assets/Mixtapes.webp'

export interface ModuleCardInfo {
    title: string;
    text: string;
    image: string;
    path: string;
    available: boolean;
}

export interface ModuleCardData {
    [key: string]: ModuleCardInfo | undefined;
}

const moduleCardData: ModuleCardData = {
    'data-analysis': {
        title: 'Data Analysis',
        text: 'Data Analysis module presents interactive dashboards using Metabase, gathering insights from royalties and sales data',
        image:  dataAnalysisImage,
        path: '/app/data-analysis',
        available: true 
    },
    'video-maker': {
        title: 'Video Maker',
        text: 'Video Maker module allows for creation and uploading of videos to YouTube, all it takes is an image and an audio file',
        image: videoMakerImage,
        path: '/app/video-maker',
        available: false
    },
    'releases': {
        title: 'Releases',
        text: 'Releases module unifies uploading, seamlessly distributing content across various modules and storing the catalog in one place.',
        image: releasesImage,
        path: '/app/youtube-manager',
        available: false
    },
    'promotion': {
        title: 'Promotion',
        text: 'Promotions module is the go-to for amplifying a label`s reach, filling mailing, pre order links and promo forms automatically',
        image: promosImage,
        path: '/app/youtube-manager',
        available: false
    },
    'advertisement': {
        title: 'Advertisement',
        text: 'Advertisement module simplifies ads management into one intuitive interface, scheduling and executing campaigns on social media.',
        image: adImage,
        path: '/app/youtube-manager',
        available: false
    },
    'demos': {
        title: 'Demos',
        text: 'Demos module is an organizational powerhouse for orchestrating releases. A collaborative hub that allows direct engagement between labels and artists',
        image: demosImage,
        path: '/app/youtube-manager',
        available: false
    },
    'calendar': {
        title: 'Calendar',
        text: 'Calendar module provides a comprehensive solution for scheduling and organizing release dates, key events and activities',
        image: calendarImage,
        path: '/app/youtube-manager',
        available: false
    },
    'mixtapes': {
        title: 'Mixtapes',
        text: 'Mixtapes module is designed to streamline the management of mixtapes, radio shows and DJ sets, all in one place.',
        image: mixtapesImage,
        path: '/app/youtube-manager',
        available: false
    },
};
  

export default moduleCardData;