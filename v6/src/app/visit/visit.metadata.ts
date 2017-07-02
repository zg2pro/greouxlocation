export class ImageInterface {
    private pathBase = "assets/img/gallery/";
    private thumbnailsBase = "thumbnails/";
    private extension = ".jpg";
    
    thumbnail?: any; //image src for the thumbnail
    image?: any; //image src for the image 
    text?: string; //optional text to show for the image
    [propName: string]: any;
    
    constructor(private file:any){
        this.thumbnail = this.pathBase + this.thumbnailsBase + file + this.extension;
        this.image = this.pathBase + file + this.extension;
    }
}
