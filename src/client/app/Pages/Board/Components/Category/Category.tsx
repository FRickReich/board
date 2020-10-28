import React, { useState } from 'react';

import { IndexSubCategory } from '../SubCategory/SubCategory';

const IndexCategory = ({ data }) =>
{
    return(
        <div className="Category">
            <a>{ data.title }</a>
            <div>
                    {
                        data.subCategories &&
                        data.subCategories.map((subCategory, i: number) =>
                        {
                            return(
                                <IndexSubCategory key={i} data={subCategory} />
                            );
                        })
                    }
            </div>
        </div>
    );
};

export { IndexCategory };
