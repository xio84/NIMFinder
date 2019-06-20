import axios from 'axios';

export default class SearchNIM { //Implements Strategy
    constructor(token, NIM){
        this.token=token;
        this.NIM=NIM;
        this.payload=10;
        this.page=0;

        this.searchresult = this.searchresult.bind(this);
    }

    searchresult(){
        var apiBaseUrl = "https://api.stya.net/nim/byname";
        var rows=[];
            axios.get(apiBaseUrl,{
                headers: {
                    'Auth-Token': this.token
                },
                params: {
                    query: this.NIM,
                    count: 100
                }
            })
            .then((response) =>{
                console.log(response);
                this.payload = response.data.code;
                Array.prototype.push.apply(rows,response.data.payload);
                console.log(rows);
                this.page++;
            })
            .catch((error) => {
                this.payload = -3;
            })
            return rows;
    }
}