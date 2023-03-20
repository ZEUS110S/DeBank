import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

class News extends React.Component{
    constructor(){
        super()
        this.state = {
            feedSource: [],
            feedSourceByPagination: [],
            start: 0,
            end: 3
        }
        this.test = this.test.bind(this)
    }

    componentDidMount(){
        const url = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fvnexpress.net%2Frss%2Fgiao-duc.rss&api_key=n85bwswje5twrq6k9bkefadokwcgxgtzkhswnbvb&order_by=pubDate&count=60"

        axios.get(url)
            .then(response => {
                console.log(response.data.items);
                this.setState({
                    feedSource: response.data.items
                }, () => {
                    this.setState({
                        feedSourceByPagination: this.state.feedSource.slice(0,6)
                    })
                })
            })
    }

    test(currentPage){
        this.setState({
            start: (currentPage - 1) * 6,
            end: currentPage * 6
        }, () => {
            this.setState({
                feedSourceByPagination: this.state.feedSource.slice(this.state.start, this.state.end)
            })
        })
    }

    render(){
        let feeds = this.state.feedSourceByPagination.map((feed, index) => (
            <div key={index} id="news-item-wrapper" dangerouslySetInnerHTML={{__html:`<a class="news-title" onclick="openInNewTab("${feed.link}")" href=${feed.link}>${feed.title}</a>` + feed.description}}>
            </div>
        ))

        return (
            <div id="body">
                <div id="news-header">
                    <h2>Tin mới nhất</h2>
                    <hr style={{zIndex: -999}}/>  
                </div>
                {feeds}
                <div id="news-pagination">
                    <button >
                        <FontAwesomeIcon size="1x" icon={faChevronLeft}/>
                    </button>
                    <button onClick={() => this.test(1)}>1</button>
                    <button onClick={() => this.test(2)}>2</button>
                    <button onClick={() => this.test(3)}>3</button>
                    <button onClick={() => this.test(4)}>4</button>
                    <button onClick={() => this.test(5)}>5</button>
                    <button onClick={() => this.test(6)}>6</button>
                    <button onClick={() => this.test(7)}>7</button>
                    <button onClick={() => this.test(8)}>8</button>
                    <button onClick={() => this.test(9)}>9</button>
                    <button onClick={() => this.test(10)}>10</button>
                    <button >
                        <FontAwesomeIcon size="1x" icon={faChevronRight}/>
                    </button>
                </div>
            </div>
        );
    }
}

export default News