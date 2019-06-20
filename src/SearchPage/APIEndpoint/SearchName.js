import axios from 'axios';

export default class SearchName { //Implements Strategy
    constructor(token, name){
        this.token=token;
        this.name=name;
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
                    name: this.name,
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