/* eslint-disable no-console */
const KEY = 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y';
const MAX_RESULTS = 16;

export default function loadClipsInform(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${KEY}&type=video&part=snippet&maxResults=${MAX_RESULTS}&fields=nextPageToken,items(id(videoId))&q=${query}`;
  return fetch(url)
    .then(response => response.json())
    .then((json) => {
      const id = json.items.map(el => el.id.videoId).join(',');
      return fetch(`https://www.googleapis.com/youtube/v3/videos?key=${KEY}&id=${id}&part=snippet,statistics`)
        .then(response => response.json())
        .then((obj) => {
          const clips = [];
          const arr = obj.items;
          arr.forEach((element) => {
            const clip = {};
            clip.title = element.snippet.title;
            clip.url = `https://www.youtube.com/watch?v=${element.id}`;
            clip.imgURL = element.snippet.thumbnails.medium.url;
            clip.channelTitle = element.snippet.channelTitle.substring(0, 40);
            clip.publishedAt = element.snippet.publishedAt.toLocaleString('ru-Ru').substring(0, 10);
            clip.viewCount = element.statistics.viewCount;
            clip.description = `${element.snippet.description.substring(0, 100)} ...`;
            clips.push(clip);
          });
          return clips;
        })
        .catch(ex => console.log('error to get IDs', ex));
    })
    .catch(ex => console.log('error to get query', ex));
}
