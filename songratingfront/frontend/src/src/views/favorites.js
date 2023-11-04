import React, { Component} from "react";

import axios from "axios";

class Favorite extends Component {
    constructor(props){
        super(props);
        this.state = {
            songsList:[],
            ratingsList:[],
            activeSong:{
                id: null,
                song: '',
                artist: '',
                favorite: '',
            },
            activeRating: {
                id: null,
                username: 'test_user',
                song: '',
                rating: '',
            },
            songModal: false,
            ratingModal: false,
            errorFlag: false,
        }
    };

    componentDidMount() {
        this.refreshList();
    };

    refreshList = () => {
        this.setState({errorMessage: null})
        axios
            .get("https://music-rater-comp333.herokuapp.com/api/songs/")
            .then((res) => this.setState({songsList: res.data}))
            .catch((err) => console.log(err))
        console.log('getting ratings')
        axios
            .get("https://music-rater-comp333.herokuapp.com/api/ratings/test_user/")
            .then((res) => this.setState({ratingsList: res.data}))
            .catch((err) => console.log(err))
        console.log('ratings', this.state.ratingsList)
        // console.log(this.state.songsList)
    };
 
    renderSongs = () => {
        var songs = this.state.songsList
        
        var flag = true
        
        if(flag === true)
            return songs.map((item,i) => (
            <div>
                <li
                key={i}
                className="songList"
                >
                <span
                    className="songtitles"
                    title={item.song}
                >
                    {item.favorite ? (item.song) : (null)}
                </span>
                </li>

            </div>));
            }
            
    render() {
        return(
            <main className="container">
                <h1 className="header">Favorites</h1>
                <div className="row">
                    <div className="column">
                        <div className="card">
                            {this.renderSongs()}
                        </div>
                    </div>
                </div>
            </main>
        )
    }
};

export default Favorite;



