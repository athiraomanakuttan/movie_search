export interface MovieType {
    Title : string,
    Year ?: string,
    imdbID ?:string,
    Type ?:string,
    Poster ?: string
}


export interface MovieResponseType {
    Response: string;  
    Error?: string;
    totalResults?: string;
    Search?: MovieType[];
  }
  