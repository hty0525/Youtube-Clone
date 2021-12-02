class Youtube {
    constructor(api){
        this.youtube = api;
    }
    
    async mostPop(){
        const response = await this.youtube.get('videos',{ //https://youtube.googleapis.com/youtube/v3/videos?key=&chart=mostPopular&part=snippet,statistics&maxResults=24&regionCode=kr&fields=items(snippet(description,thumbnails,title,publishedAt,channelTitle),statistics,id)
            params:{
                chart:'mostPopular',
                part:'snippet,statistics',
                maxResults: 24,
                regionCode:'kr',
                fields:
                    'items(snippet(channelId,description,thumbnails,title,publishedAt,channelTitle),statistics,id)'
            }
        })
        return response.data.items
    }

    async searchId(searchValue){
        const response = await this.youtube.get('search', {
            params: {
            part: 'id',
            maxResults : 24,
            q: searchValue,
            type:'video',
            },
        });
        return response.data.items.map(item => item.id.videoId).join()
    }

    async searchVideo(id){
        const response = await this.youtube.get('videos',{
            params:{
                id,
                part:'snippet,statistics',
                fields:
                    'items(snippet(channelId,description,thumbnails,title,publishedAt,channelTitle),statistics,id)'
            }
        })
        return response.data.items
    }

    async channelId(id){
        const response = await this.youtube.get('channels',{
            params:{
                id,
                part:'id,snippet,statistics',
                fields:
                    'items(statistics(subscriberCount),snippet(thumbnails(medium(url))))'
            }
        })
        return response?.data?.items
    }
}

export default Youtube