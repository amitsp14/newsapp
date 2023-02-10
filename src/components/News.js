import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'react';



export class News extends Component {


    static defaultProps = {
        country: 'in',
        pagesize: 16,
        category: 'general'
    }

    static propTypes = {
        name: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {

        super();
        console.log("Constructor from news")

        this.state = {

            articles: [],
            loading: false,
            page: 1

        }
    };


    

    async updateNews() {


        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3aca45fe66a546378a56c15957a4a40b&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);

        this.setState({

            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false

        })


    }
    async componentDidMount() {

       this.updateNews()
    };


    Nextclick = async () => {



        this.setState({

            page: this.state.page + 1,


        })
        this.updateNews();
    }


    Prevclick = async () => {

        

        this.setState({

            page: this.state.page - 1,
        })

        this.updateNews();

    }

    render() {
        return (
            <div className='container my-4'>

                <h2 className='my-3'>Top headlines</h2>
                {this.state.loading && <Spinner />}

                <div className='row'>

                    {!this.state.loading && this.state.articles.map((element) => {

                        return (

                            <div className='col-md-3' key={element.url}>
                                <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />

                            </div>
                        )

                    })}
                </div>

                <div className='container d-flex justify-content-between'>

                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.Prevclick}>&larr; Previous</button>
                    <button type="button" disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize))} className="btn btn-dark" onClick={this.Nextclick}>Next &rarr;</button>

                </div>

            </div>
        )
    }
}

export default News