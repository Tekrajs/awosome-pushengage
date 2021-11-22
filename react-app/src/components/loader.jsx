import React from "react";

export const Loader = (props) => {
    return (
        <div className="overlay product-table" style={ props.style } >
            <div id="Product-table-loader" className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};