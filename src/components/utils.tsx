
export default function truncateText (text:string, cutoff:number) {
        if(text){
            if(text.length > cutoff){
                text = text.slice(0,cutoff+1) + "...";
            }
        }
        return text;
    }