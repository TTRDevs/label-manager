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
    image: string; // Change 'any' to 'string' if your images are imported as modules
    path: string;
    available: boolean;
}

export interface ModuleCardData {
    [key: string]: ModuleCardInfo | undefined; // Index signature
}


const moduleCardData: ModuleCardData = {
    'data-analysis': {
        title: 'Data Analysis',
        text: 'Data Analysis module presents interactive dashboards using Metabase and PostgreSQL, to provide a complete view data and collect valuable Insights',
        image:  dataAnalysisImage,
        path: '/app/data-analysis',
        available: true 
    },
    'video-maker': {
        title: 'Video Maker',
        text: 'Video Maker module allows for automatic creation and upload of releases to YouTube',
        image: videoMakerImage,
        path: '/app/youtube-manager',
        available: false
    },
    'releases': {
        title: 'Releases',
        text: 'Releases module unifies uploading at one platform. it seamlessly distributes your content across various modules',
        image: releasesImage,
        path: '/app/youtube-manager',
        available: false
    },
    'promotion': {
        title: 'Promotion',
        text: 'The Promotions Module is your go-to for amplifying your label`s reach, crafting eye-catching promotional artwork for your releases',
        image: promosImage,
        path: '/app/youtube-manager',
        available: false
    },
    'advertisement': {
        title: 'Advertisement',
        text: 'The Advertisement Module simplifies your ad and social media management into one intuitive interface, enabling seamless integration',
        image: adImage,
        path: '/app/youtube-manager',
        available: false
    },
    'demos': {
        title: 'Demos',
        text: 'The Demos Module is an organizational powerhouse for orchestrating releases. A collaborative hub that allows directly engagement with labels and artists',
        image: demosImage,
        path: '/app/youtube-manager',
        available: false
    },
    'calendar': {
        title: 'Calendar',
        text: 'The Calendar Module provides a comprehensive solution for scheduling and organizing your label`s key events and activities',
        image: calendarImage,
        path: '/app/youtube-manager',
        available: false
    },
    'mixtapes': {
        title: 'Mixtapes',
        text: 'The Mixtapes Module is designed to streamline the management of mixtapes, radio shows, and DJ sets, live or recorded',
        image: mixtapesImage,
        path: '/app/youtube-manager',
        available: false
    },
};
  

export default moduleCardData;

// import dataAnalysisImage from './../../assets/DataAnalysis.webp';
// import videoMakerImage from './../../assets/VideoMaker.webp'
// import releasesImage from './../../assets/Releases2.webp'
// import promosImage from './../../assets/Promos.webp'
// import demosImage from './../../assets/Demos.webp'
// import calendarImage from './../../assets/Calendar.webp'
// import adImage from './../../assets/Ad.webp'
// import mixtapesImage from './../../assets/Mixtapes.webp'

// export interface ModuleCardInfo {
//     title: string;
//     text: string;
//     image: string; // Change 'any' to 'string' if your images are imported as modules
//     path: string;
//     available: boolean;
// }

// export interface ModuleCardData {
//     [key: string]: ModuleCardInfo | undefined; // Index signature
// }


// const moduleCardData: ModuleCardData = {
//     'data-analysis': {
//         title: 'Data Analysis',
//         text: 'Data Analysis module presents interactive dashboards using Metabase and PostgreSQL to present, store and organize information. Allowing users to have a complete view of their data and collect valuable Insights',
//         image:  dataAnalysisImage,
//         path: '/app/data-analysis',
//         available: true 
//     },
//     'video-maker': {
//         title: 'Video Maker',
//         text: 'Video Maker module allows for automatic creation and upload of videos via image and song upload. New feature of automatic video uploading coming soon',
        
//         image: videoMakerImage,
//         path: '/app/youtube-manager',
//         available: false
//     },
//     'releases': {
//         title: 'Releases',
//         text: 'Releases module unifies uploading at one platform. With a single upload, it seamlessly distributes your content across various modules, such as music files, covert art images, releases descriptions and much more',
//         image: releasesImage,
//         path: '/app/youtube-manager',
//         available: false
//     },
//     'promotion': {
//         title: 'Promotion',
//         text: 'The Promotions Module is your go-to for amplifying your label`s reach, crafting eye-catching promotional artwork for your releases, and engaging your audience with automated',
//         image: promosImage,
//         path: '/app/youtube-manager',
//         available: false
//     },
//     'advertisement': {
//         title: 'Advertisement',
//         text: 'The Advertisement Module simplifies your ad and social media management into one intuitive interface, enabling seamless integration and straightforward execution of campaigns.',
//         image: adImage,
//         path: '/app/youtube-manager',
//         available: false
//     },
//     'demos': {
//         title: 'Demos',
//         text: 'The Demos Module is an organizational powerhouse for orchestrating releases. Artists submit their demos to one location, providing a collaborative hub that allows directly engagement with artists.',
//         image: demosImage,
//         path: '/app/youtube-manager',
//         available: false
//     },
//     'calendar': {
//         title: 'Calendar',
//         text: 'The Calendar Module provides a comprehensive solution for scheduling and organizing your label`s key events and activities. It`s the go-to resource for planning release dates, mixtape launches, events, payment deadlines, and more.',
//         image: calendarImage,
//         path: '/app/youtube-manager',
//         available: false
//     },
//     'mixtapes': {
//         title: 'Mixtapes',
//         text: 'The Mixtapes Module is designed to streamline the management of mixtapes, radio shows, and DJ sets, live or recorded. It offers a suite of tools tailored to simplify the curation process.',
//         image: mixtapesImage,
//         path: '/app/youtube-manager',
//         available: false
//     },
// };
  

// export default moduleCardData;
