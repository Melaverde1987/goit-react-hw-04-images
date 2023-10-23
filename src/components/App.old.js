import React, { Component } from 'react';
import { RevolvingDot } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'api';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    perPage: 12,
    imagesItems: [],
    loading: false,
    error: false,
    loadMore: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true, error: false });
        const images = await fetchImages(
          this.state.page,
          this.state.perPage,
          this.state.query
        );

        this.setState(prevState => {
          return {
            imagesItems: [...prevState.imagesItems, ...images.hits],
            loadMore:
              this.state.page <
              Math.ceil(images.totalHits / this.state.perPage),
          };
        });

        if (images.hits < 1) {
          toast.error('There are no entries. Try again');
        }
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handlerSubmit = evt => {
    this.setState({
      imagesItems: [],
      query: evt.search,
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    console.log(this.state);
    const { imagesItems } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handlerSubmit} />
        {this.state.imagesItems.length > 0 && (
          <ImageGallery items={imagesItems} />
        )}
        {this.state.loading && (
          <RevolvingDot
            radius="45"
            strokeWidth="5"
            color="#ffd400"
            secondaryColor="#02c9c9"
            ariaLabel="revolving-dot-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}

        {this.state.loadMore && (
          <div className="wrapper">
            <button
              type="button"
              className="btn btn-outline"
              onClick={this.handleLoadMore}
            >
              Load more
            </button>
          </div>
        )}

        <Toaster position="top-right" />
      </>
    );
  }
}
