import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ReactPaginate from 'react-paginate';
import './styles.css';
const Pagination = () => {
  return (
    <>
      {/* novo do react-paginate */}
      <ReactPaginate
        pageCount={10}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        containerClassName='pagination-container'
        pageLinkClassName='pagination-item'
        breakClassName='pagination-item'
        previousClassName='arrow-previous'
        nextClassName='arrow-next'
        activeLinkClassName='pagination-link-active'
        disabledClassName='arrow-inactive'

        previousLabel={<ArrowIcon />}
        nextLabel={<ArrowIcon />}
      />

      {/* antigo raw   
      <div className="pagination-container">
        <ArrowIcon className='arrow-previous arrow-inactive' />
        <div className="pagination-item active">1</div>
        <div className="pagination-item">2</div>
        <div className="pagination-item">3</div>
        <div className="pagination-item">...</div>
        <div className="pagination-item">10</div>
        <ArrowIcon className='arrow-next arrow-active' />
      </div>*/}
    </>
  );
};

export default Pagination;