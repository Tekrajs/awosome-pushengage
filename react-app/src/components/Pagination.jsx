import React from "react";

const Pagination = props => {

    const shouldShowPrev = (props) => {
        return props.currentPage > 1;
    };

    const shouldShowNext = (props) => {
        return props.blogCount > (props.currentPage * props.pageLimit);
    };

    if (parseInt(props.blogCount) <= parseInt(props.pageLimit)) {
        return null;
    }


    return (
        <div className="container">
            <ul className="list-group list-group-horizontal mt-2 justify-content-center">
                <li data-page_type='prev' className={ "list-group-item" + (!shouldShowPrev(props) ? " disabled" : '') } onClick={ (e) => props.handlePagination(e) }>
                    <i className={ "fa fa-angle-double-left text-info" } />
                </li>
                <li data-page_type='next' className={ "list-group-item" + (!shouldShowNext(props) ? " disabled" : '') } onClick={ (e) => props.handlePagination(e) }><i className={ "fa fa-angle-double-right text-info" } /></li>
            </ul>
        </div>

    );
};

export default Pagination;